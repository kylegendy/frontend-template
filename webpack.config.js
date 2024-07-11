"use strict";

const dotenv = require('dotenv');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = env => {

    // call dotenv and it will return an Object with a parsed key 
    const environment = dotenv.config({ path: './.env' }).parsed;

    // reduce it to a nice object, the same as before
    const envKeys = Object.keys(environment).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(environment[next]);
        return prev;
    }, {});

    const prodMode = environment.NODE_ENV === 'production';

    // client config
    const clientLandingBundleConfig = {

        mode: environment.NODE_ENV,
        devtool: "source-map",
        resolve: {
            extensions: [".js", ".json", ".ts", ".tsx"],
            alias: {}
        },
        plugins: [
            new webpack.DefinePlugin(envKeys)
        ].concat([new MiniCssExtractPlugin({filename: 'styles/landing.css'})]),
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
                    use: [
                        prodMode ? MiniCssExtractPlugin.loader : 'style-loader',
                        'css-loader',
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: [ 
                                        require('tailwindcss')('./tailwind.config.landing.js'),
                                        require('autoprefixer'),
                                    ]
                                },
                            }
                        }
                    ],
                }
            ]
        },
        target: 'web',
        output: {
            path: __dirname + "/public",
            filename: "[name].js"
        },
        name: 'landing',
        entry: { 'landing': __dirname + "/src/landing/landing.tsx" },
    };

    return [clientLandingBundleConfig];
};