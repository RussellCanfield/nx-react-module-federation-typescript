const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
const deps = require('../../package.json').dependencies;
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = (config, context) => {
  return {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
      port: 4201,
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      historyApiFallback: true,
      hot: true,
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
            loader: "babel-loader"
          },
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        }
      ],
    },
    output: {
      publicPath: 'auto',
      chunkFilename: '[id].[contenthash].js'
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'AboutApp',
        filename: 'remoteEntry.js',
        exposes: {
          './aboutme': './src/app/components/aboutme',
        },
        remotes: {
          'ShellApp': 'ShellApp@http://localhost:4200/remoteEntry.js'
        },
        shared: {
          react: {
            singleton: true,
            eager: true,
            requiredVersion: deps.react,
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