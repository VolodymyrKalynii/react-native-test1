module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            [
                'module-resolver',
                {
                    alias: {
                        'red': './src/redux',
                        '_sound': './src/sound',
                        '_img': './src/img',
                    },
                },
            ]
        ]
    };
};
