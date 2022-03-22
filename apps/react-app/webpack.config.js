const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const deps = require('../../package.json').dependencies;
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = (config, context) => {
  return {
    mode: process.env.NODE_ENV || 'development',
    optimization: {
      minimize: false,
    },
    devtool: 'source-map',
    devServer: {
      port: 4200,
      static: path.join(__dirname, 'dist'),
      liveReload: false,
      hot: true,
      host: 'localhost',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      }
    },
    resolve: {
      extensions: ['.ts', '.js', '.tsx', '.jsx'],
      //plugins: [new TsconfigPathsPlugin()]
    },
    entry: "./src/index.ts",
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                ["@babel/preset-react", {"runtime": "automatic"}],
                "@babel/preset-typescript",
              ],
            },
          },
        },
      ],
    },
    output: {
      publicPath: 'auto',
      clean: true
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'ReactApp',
        //library: {},
        filename: "remoteEntry.js",
        exposes: {
          './layout': './src/app/components/layout',
          './test': './src/app/components/test'
        },
        shared: {
          //...deps,
          react: { singleton: true, eager: true, requiredVersion: deps.react },
          'react-dom': {
            singleton: true,
            eager: true,
            requiredVersion: deps['react-dom'],
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html',
        chunks: ['main']
      })
    ],
  };
};