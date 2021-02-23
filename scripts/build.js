#!/usr/bin/env node

const esbuild = require('esbuild');
const path = require('path');

const srcDir = path.resolve(__dirname, '../src');
const outDir = path.resolve(__dirname, '../dist');

const matrix = {
  cjs: {
    format: 'cjs',
    outExtension: { '.js': '.cjs' },
  },
  esm: {
    format: 'esm',
    outExtension: { '.js': '.mjs' },
  },
};

async function main() {
  for await (let task of Object.entries(matrix).map(([type, options]) => {
    const config = {
      entryPoints: [path.resolve(srcDir, 'index.ts')],
      outdir: outDir,
      ...options,
      bundle: true,
      minify: true,
      sourcemap: true,
      target: ['es2018'],
      tsconfig: path.resolve(__dirname, '../tsconfig.json'),
      define: {
        'process.env.NODE_ENV': '"production"',
      },
    };

    return esbuild.build(config).catch(() => process.exit(1));
  })) {
    // iterating tasks
  }
}

main();
