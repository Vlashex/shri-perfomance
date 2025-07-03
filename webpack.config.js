const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");

module.exports = {
  entry: "./src/index.jsx",
  output: {
    filename: "bundle.[contenthash].js",
    path: path.resolve(__dirname, "docs"),
    assetModuleFilename: "assets/[hash][ext][query]",
  },
  module: {
    rules: [
      // JS / JSX
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      // svg
      {
        test: /\.svg$/i,
        type: "asset/resource",
        generator: {
          filename: "icons/[name].[contenthash][ext]",
        },
      },

      // остальные изображения
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        type: "asset/resource",
      },

      // CSS
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },

      // Шрифты
      {
        test: /\.(woff2?|ttf|eot|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: true,
    }),
    new SpriteLoaderPlugin({ plainSprite: true }),
  ],
  devServer: {
    static: "./docs",
    port: 3000,
    hot: true,
    open: true,
  },
  mode: "production",
};
