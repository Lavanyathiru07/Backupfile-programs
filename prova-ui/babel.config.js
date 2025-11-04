module.exports = {
    plugins: ['@babel/plugin-proposal-export-default-from'],
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: '18',
                },
                modules: 'commonjs', // Ensure ES modules are transpiled to CommonJS
            },
        ],
    ],
};
