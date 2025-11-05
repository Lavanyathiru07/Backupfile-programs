export default {
    plugins: ['@babel/plugin-proposal-export-default-from'],
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: '18',
                },
            },
        ],
    ],
};
