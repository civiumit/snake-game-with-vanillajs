import path from 'path';

const __dirname = path.dirname(new URL(
    import.meta.url).pathname);

const config = {
    entry: './assets/src/js/snake.js',
    output: {
        path: path.resolve(__dirname, 'assets/dist/js'),
        filename: 'snake.js'
    },
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env']
                }
            }
        }]
    }
}

export default config;