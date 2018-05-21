const path = require('path');
// const bootstrap = require('node_modules/bootstrap/dist/css/bootstrap.css');
module.exports = {
  entry: {
    app: './src/main.js'
  },
  module: {
      rules: [{
      test: /\.css$/,
      use: [ 'style-loader', 'css-loader' ]
    }]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};
