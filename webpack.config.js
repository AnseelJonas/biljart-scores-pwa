const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const UglifyJsWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        app: './assets/js/source/script.js'
    },
    output: {
        path: path.resolve(__dirname, 'assets/js/build'),
        filename: "bundle.js"
    },
    mode: 'development',
    resolve: {
        alias: {
          vue: 'vue/dist/vue.js'
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new UglifyJsWebpackPlugin()
    ]
};
