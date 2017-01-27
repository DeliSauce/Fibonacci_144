module.exports = {
  context: __dirname,
  entry: "./lib/main.js",
  output: {
    path: "./",
    filename: "bundle.js"
  },
  resolve: {
    extensions: ["", ".js"]
  },
  devtool: 'source-maps'
};
