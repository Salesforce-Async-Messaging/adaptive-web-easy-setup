import esbuild from 'rollup-plugin-esbuild'
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: './controller/controller.ts',
  output: {
    file: './dist/controller.js',
    format: 'iife',
    name: 'WebCurationController',
    inlineDynamicImports: true
  },
  plugins: [
    resolve(),
    commonjs({
        include: /node_modules/
    }),
    esbuild({
        target: 'ES2015',
        minify: false,
        sourceMap: false
    })
  ]
};
