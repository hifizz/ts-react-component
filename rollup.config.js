import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
//import serve from 'rollup-plugin-serve';
//import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import clean from 'postcss-clean';
import minify from 'rollup-plugin-babel-minify';
import sass from 'rollup-plugin-sass';

const dev = 'development';
const prod = 'production';
const env = (process.env.NODE_ENV === prod || process.env.NODE_ENV === dev) ? process.env.NODE_ENV : dev;

const plugins = [
  replace({
    'process.env.NODE_ENV': JSON.stringify(env)
  }),
  resolve(),
  commonjs({
    // All of our own sources will be ES6 modules, so only node_modules need to be resolved with cjs
    include: 'node_modules/**',
    namedExports: {
      'node_modules/react/index.js': [
        'Component',
        'PropTypes',
        'createElement',
      ]
    },
  }),
  postcss({
    extract: true, // extracts to `${basename(dest)}.css`
    plugins: [autoprefixer, clean],
    writeDefinitions: true,
    // postcssModulesOptions: { ... }
  }),
  sass(),
  typescript({
    tsconfigDefaults: {
      compilerOptions: {
        declaration: true,
        useTsconfigDeclarationDir: false
      }
    },
    tsconfig: "tsconfig.json"
  })
];

if (env === prod) {
  plugins.push(minify({
    comments: false
  }));
}

export default {
  plugins,
  external: [
    'react',
  ],
  input: './src/index.tsx',
  output: [
    // 输出 es module 模块
    {
      sourcemap: true,
      file: './lib/es/index.js',
      format: 'es'
    },
    // 输出 commonJS 模块
    {
      sourcemap: true,
      file: './lib/es5/index.js',
      format: 'cjs'
    },
    // 输出 umd 模块
    {
      sourcemap: true,
      name: "Test",
      file: './lib/umd/index.js',
      format: 'umd'
    }
  ]
};
