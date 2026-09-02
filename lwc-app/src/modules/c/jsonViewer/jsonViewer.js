import { LightningElement, api } from 'lwc';

export default class JsonViewer extends LightningElement {
    @api content = '{}';

    get parsedContent() {
        try {
            const data = JSON.parse(this.content);
            // Extract the curation data for display
            if (data.curation) {
                return JSON.stringify(data.curation, null, 2);
            }
            return JSON.stringify(data, null, 2);
        } catch (e) {
            console.error('JsonViewer: Error parsing content', e);
            return this.content;
        }
    }

    get title() {
        try {
            const data = JSON.parse(this.content);
            return data.text || 'JSON Data';
        } catch {
            return 'JSON Data';
        }
    }

    handleCopy() {
        const textToCopy = this.parsedContent;
        navigator.clipboard.writeText(textToCopy).then(() => {
            // Visual feedback - could enhance with a toast notification
            const button = this.template.querySelector('.copy-button');
            if (button) {
                button.style.color = '#4caf50';
                setTimeout(() => {
                    button.style.color = '';
                }, 1500);
            }
        }).catch(err => {
            console.error('Failed to copy JSON:', err);
        });
    }
}
