import esbuild from 'esbuild';
import config from './esbuild.config.js';

esbuild
    .context(Object.assign(config, {
        sourcemap: true,
        minifyWhitespace: true
    }))
    .then(ctx => ctx.serve({ servedir: 'public', port: 24_8_28 }));