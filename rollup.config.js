import { babel } from '@rollup/plugin-babel';
import ts from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default [
  {
    input: 'src/index.ts',
    output: [{ file: pkg.jsdelivr, format: 'iife', name: 'OnboardenImporter' }],
    plugins: [
      ts(),
      babel({
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
      }),
    ],
  },
];
