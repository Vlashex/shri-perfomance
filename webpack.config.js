const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const SpriteLoaderPlugin = require("svg-sprite-loader/plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    app: "./src/index.jsx",
  },
  output: {
    filename: "bundle.[contenthash].js",
    chunkFilename: "[name].[contenthash:8].js",
    path: path.resolve(__dirname, "docs"),
    assetModuleFilename: "assets/[hash][ext][query]",
    publicPath: "./",
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
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
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

  optimization: {
    minimize: true,
    minimizer: [`...`, new CssMinimizerPlugin()],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
    runtimeChunk: "single",
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:8].css",
      chunkFilename: "[id].[contenthash:8].css",
    }),
    new SpriteLoaderPlugin({ plainSprite: true }),
    new CompressionPlugin({
      algorithm: "gzip",
      test: /\.(js|css|html|svg)$/,
      threshold: 10 * 1024,
      minRatio: 0.8,
    }),
    new CompressionPlugin({
      algorithm: "brotliCompress",
      filename: "[path][base].br",
      test: /\.(js|css|html|svg)$/,
      threshold: 10 * 1024,
      minRatio: 0.8,
    }),
  ],

  devServer: {
    static: "./docs",
    port: 3000,
    hot: true,
    open: true,
  },

  performance: {
    hints: "warning",
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};
