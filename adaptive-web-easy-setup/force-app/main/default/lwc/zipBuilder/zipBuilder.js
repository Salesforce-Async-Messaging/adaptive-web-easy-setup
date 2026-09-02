/**
 * Minimal ZIP builder using STORED (no compression) method.
 * Produces a valid ZIP file as a base64 string.
 *
 * @param {Array<{name: string, content: string}>} files
 * @returns {string} base64-encoded ZIP
 */
export function buildZip(files) {
    const encoder = new TextEncoder();

    // CRC-32 lookup table
    const crcTable = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
        let c = i;
        for (let j = 0; j < 8; j++) {
            c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
        }
        crcTable[i] = c;
    }

    function crc32(bytes) {
        let crc = 0xFFFFFFFF;
        for (let i = 0; i < bytes.length; i++) {
            crc = crcTable[(crc ^ bytes[i]) & 0xFF] ^ (crc >>> 8);
        }
        return (crc ^ 0xFFFFFFFF) >>> 0;
    }

    const entries = files.map(f => ({
        name: encoder.encode(f.name),
        data: encoder.encode(f.content),
    }));

    // Calculate total size
    let localSize = 0;
    for (const e of entries) {
        localSize += 30 + e.name.length + e.data.length;
    }
    let centralSize = 0;
    for (const e of entries) {
        centralSize += 46 + e.name.length;
    }
    const totalSize = localSize + centralSize + 22;

    const buf = new ArrayBuffer(totalSize);
    const view = new DataView(buf);
    const bytes = new Uint8Array(buf);

    let offset = 0;
    const centralEntries = [];

    // Local file headers + data
    for (const e of entries) {
        const localOffset = offset;
        const crc = crc32(e.data);

        view.setUint32(offset, 0x04034B50, true); offset += 4;
        view.setUint16(offset, 20, true); offset += 2;
        view.setUint16(offset, 0, true); offset += 2;
        view.setUint16(offset, 0, true); offset += 2;
        view.setUint16(offset, 0, true); offset += 2;
        view.setUint16(offset, 0x5421, true); offset += 2; // date
        view.setUint32(offset, crc, true); offset += 4;
        view.setUint32(offset, e.data.length, true); offset += 4;
        view.setUint32(offset, e.data.length, true); offset += 4;
        view.setUint16(offset, e.name.length, true); offset += 2;
        view.setUint16(offset, 0, true); offset += 2;
        bytes.set(e.name, offset); offset += e.name.length;
        bytes.set(e.data, offset); offset += e.data.length;

        centralEntries.push({ name: e.name, data: e.data, crc, localOffset });
    }

    const centralOffset = offset;

    // Central directory
    for (const e of centralEntries) {
        view.setUint32(offset, 0x02014B50, true); offset += 4;
        view.setUint16(offset, 20, true); offset += 2;
        view.setUint16(offset, 20, true); offset += 2;
        view.setUint16(offset, 0, true); offset += 2;
        view.setUint16(offset, 0, true); offset += 2;
        view.setUint16(offset, 0, true); offset += 2;
        view.setUint16(offset, 0x5421, true); offset += 2;
        view.setUint32(offset, e.crc, true); offset += 4;
        view.setUint32(offset, e.data.length, true); offset += 4;
        view.setUint32(offset, e.data.length, true); offset += 4;
        view.setUint16(offset, e.name.length, true); offset += 2;
        view.setUint16(offset, 0, true); offset += 2;
        view.setUint16(offset, 0, true); offset += 2;
        view.setUint16(offset, 0, true); offset += 2;
        view.setUint16(offset, 0, true); offset += 2;
        view.setUint32(offset, 0, true); offset += 4;
        view.setUint32(offset, e.localOffset, true); offset += 4;
        bytes.set(e.name, offset); offset += e.name.length;
    }

    const centralEnd = offset;

    // End of central directory
    view.setUint32(offset, 0x06054B50, true); offset += 4;
    view.setUint16(offset, 0, true); offset += 2;
    view.setUint16(offset, 0, true); offset += 2;
    view.setUint16(offset, entries.length, true); offset += 2;
    view.setUint16(offset, entries.length, true); offset += 2;
    view.setUint32(offset, centralEnd - centralOffset, true); offset += 4;
    view.setUint32(offset, centralOffset, true); offset += 4;
    view.setUint16(offset, 0, true); offset += 2;

    // Convert to base64
    let binary = '';
    for (let i = 0; i < bytes.length; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}
