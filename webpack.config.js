"use strict";

const dotenv = require('dotenv');
const webpack = require('webpack');

module.exports = env => {

    // call dotenv and it will return an Object with a parsed key 
    const environment = dotenv.config({ path: './.env' }).parsed;

    // reduce it to a nice object, the same as before
    const envKeys = Object.keys(environment).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(environment[next]);
        return prev;
    }, {});

    // client config
    const clientMainBundleConfig = {

        mode: environment.NODE_ENV,
        devtool: "source-map",
        resolve: {
            extensions: [".js", ".json", ".ts", ".tsx"],
            alias: { 
                "react": "preact/compat",
                "react-dom/test-utils": "preact/test-utils",
                "react-dom": "preact/compat",
            }
        },
        plugins: [
            new webpack.DefinePlugin(envKeys)
        ],
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ["babel-loader"]
                },
                {
                    test: /\.css$/,
                    use: [ 'style-loader', 'css-loader' ]
                }
            ]
        },
        target: 'web',
        output: {
            path: __dirname + "/public",
            filename: "[name].js"
        },
        name: 'main',
        entry: { 'main': __dirname + "/src/main.tsx" },
    };

    return [clientMainBundleConfig];
};