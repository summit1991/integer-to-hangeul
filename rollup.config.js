import babel  from '@rollup/plugin-babel'
import { terser } from "rollup-plugin-terser";

export default {
  input: 'index.js',
  external: [/@babel\/runtime/],
  plugins: [
    babel({
      babelHelpers: 'runtime',
      exclude: /^(.+\/)?node_modules\/.+$/,
      skipPreflightCheck: true
    })
  ],
  output: [{
    file: 'dist/bundle.js',
    format: 'esm',
    sourcemap: true
  }, {
    file: 'dist/bundle.min.js',
    format: 'esm',
    plugins: [terser()]
  }],
}
