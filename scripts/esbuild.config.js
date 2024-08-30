import babel from 'esbuild-plugin-babel';

const useEnvPreset = false;
const browserslist = '>0.2%, not dead';

/**
 * @type {import('esbuild').BuildOptions}
 */
const config = {
    entryPoints: ['src/index.js'],
    outfile: 'public/bundle.js',
    bundle: true,
    logLevel: 'info',
    platform: 'browser',
    format: 'iife',
    plugins: [
        babel({
            filter: /src(\/\w*)+\.js$/,
            config: {
                presets: [...(useEnvPreset ? ['@babel/preset-env', {
                    targets: browserslist,
                    loose: true,
                    useBuiltIns: 'usage'
                }] : [])],
                plugins: useEnvPreset ? [] : ['@babel/plugin-transform-runtime']
            }
        })
    ]
};

export default config;