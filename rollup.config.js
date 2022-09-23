import babel from '@rollup/plugin-babel'
import { terser } from "rollup-plugin-terser";

export default {
  input: 'index.js',
  output: [{
    file: 'dist/bundle.js',
    format: 'esm',
    sourcemap: true
  }, {
    file: 'dist/bundle.min.js',
    format: 'esm',
    plugins: [terser()]
  }],
  plugins: [
    babel({ exclude: 'node_modules/**' })
  ]
}
