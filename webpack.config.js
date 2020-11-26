module.exports = {
    entry: './src/index.js',
    output: {
        filename: './index.js',
        library: 'PageActivity'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                        ],
                    },
                },
            }
        ]
    }
};