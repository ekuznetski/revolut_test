const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (args) => ({
  entry: {
    presets: ["@babel/polyfill"],
    main: ["react-hot-loader/patch", "./src/index.tsx"],
  },
  mode: "development",

  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json", ".sass", ".scss", ".css"],
    alias: {
      "react-dom": "@hot-loader/react-dom",
      "@components": path.resolve(__dirname, "src/components"),
      "@domain": path.resolve(__dirname, "src/domain"),
      "@store": path.resolve(__dirname, "src/store"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
  devtool: args.mode === "development" ? "inline-source-map" : "source-map",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].[contenthash].bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              svgoConfig: {
                plugins: {
                  removeUselessStrokeAndFill: false,
                  removeViewBox: false,
                  prefixIds: false,
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)$/,
        loader: "url-loader",
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-react", "@babel/preset-typescript"],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  devServer: {
    open: true,
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    hot: args.mode === "development",
    port: 3000,
    watchContentBase: false,
    progress: false,
    clientLogLevel: "warning",
  },
});
