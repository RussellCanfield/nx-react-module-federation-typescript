const { ModuleFederationPlugin } = require('webpack').container;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');
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
      port: 4202,
      static: path.join(__dirname, 'dist'),
      liveReload: false,
      historyApiFallback: true,
      hot: true,
      host: 'localhost',
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
          use: [
            {
              loader: "@teamsupercell/typings-for-css-modules-loader",
              options: {
                verifyOnly: process.env.NODE_ENV === "production"
              }
            },
            {
              loader: "css-loader",
              options: { modules: true }
            }
          ]
        }
      ],
    },
    output: {
      publicPath: 'auto',
      clean: true
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'HomeApp',
        filename: 'remoteEntry.js',
        exposes: {
          './home': './src/app/components/home',
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
        template: path.resolve(__dirname, 'src/index.html'),
        //chunks: ['main']
      })
    ],
  };
};