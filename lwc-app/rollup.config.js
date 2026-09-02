import lwc from '@lwc/rollup-plugin';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  input: path.resolve(__dirname, 'src/index.js'),
  output: {
    file: path.resolve(__dirname, 'dist/lwc-app.js'),
    format: 'iife',
    name: 'AdaptiveWebLWC',
    inlineDynamicImports: true
  },
  plugins: [
    // Replace process.env.NODE_ENV for browser compatibility
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    resolve(),
    lwc({
      rootDir: __dirname,
      modules: [
        { dir: path.resolve(__dirname, 'src/modules') }
      ]
    })
  ]
};
