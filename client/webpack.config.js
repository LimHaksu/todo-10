const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist/js"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "src")],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: "last 2 versions, > 1%",
                },
              ],
            ],
          },
        },
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "./dist"),
    publicPath: "/js/",
    compress: true,
    port: 5500,
    hot: true,
  },
  devtool: "source-map",
  mode: "development",
};
