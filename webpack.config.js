const path = require('path');
const bootstrap = require('bootstrap/dist/css/bootstrap.css');
module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};
