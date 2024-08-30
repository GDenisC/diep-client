import esbuild from 'esbuild';
import config from './esbuild.config.js';

esbuild
    .build(Object.assign(config, {
        sourcemap: 'external',
        minify: true
    }))
    .then(({ metafile }) => esbuild.analyzeMetafile(metafile).then(console.log));