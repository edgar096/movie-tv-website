const path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    landingpage: "./src/app/inject-bootstrap.js",
    moviewebsite: "./src/app/movie-code.js",
    moviedetails: "./src/app/movie-details.js",
    tvshowswebsite: "./src/app/tv-code.js",
    tvshowsdetails: "./src/app/tv-details.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      title: "Landing Page",
      chunks: ["landingpage"],
      template: "./src/index.html",
    }),
    new HtmlWebpackPlugin({
      filename: "movies.html",
      title: "Movie Website",
      chunks: ["moviewebsite"],
      template: "./src/movies.html",
    }),
    new HtmlWebpackPlugin({
      filename: "movie-details.html",
      title: "Movie Details",
      chunks: ["moviedetails"],
      template: "./src/movie-details.html",
    }),
    new HtmlWebpackPlugin({
      filename: "tv-shows.html",
      title: "TV Shows Website",
      chunks: ["tvshowswebsite"],
      template: "./src/tv-shows.html",
    }),
    new HtmlWebpackPlugin({
      filename: "tv-shows-details.html",
      title: "TV Shows Details",
      chunks: ["tvshowsdetails"],
      template: "./src/tv-shows-details.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(svg|png|jpg|gif)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[hash].[ext]",
            outputPath: "imgs",
          },
        },
      },
    ],
  },
};
