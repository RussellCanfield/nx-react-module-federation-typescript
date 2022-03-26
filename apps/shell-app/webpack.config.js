const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const deps = require('../../package.json').dependencies;
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = (config, context) => {
  return {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
      port: 4200,
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      historyApiFallback: true,
      hot: 'only',
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
      }
    },
    resolve: {
      extensions: ['.ts', '.js', '.tsx', '.jsx', '.css'],
      plugins: [new TsconfigPathsPlugin()]
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
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
              options:
              {
                importLoaders: 1,
                modules: true
              }
            },
            {
              loader: '@teamsupercell/typings-for-css-modules-loader',
            },
          ]
        }
      ],
    },
    output: {
      publicPath: 'auto',
      chunkFilename: '[id].[contenthash].js'
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'ShellApp',
        filename: "remoteEntry.js",
        exposes: {
          './shell': './src/app/components/shell'
        },
        remotes: {
          'ShellApp': 'ShellApp@http://localhost:4200/remoteEntry.js',
          'AboutApp': 'AboutApp@http://localhost:4201/remoteEntry.js',
          'HomeApp': 'HomeApp@http://localhost:4202/remoteEntry.js'
        },
        shared: {
          react: { 
            singleton: true, 
            eager: true, 
            requiredVersion: deps.react 
          },
          'react-dom': {
            singleton: true,
            eager: true,
            requiredVersion: deps['react-dom'],
          },
          'react-router-dom': {
            singleton: true,
            eager: true,
            requiredVersion: deps['react-router-dom']
          }
        },
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      })
    ],
  };
};