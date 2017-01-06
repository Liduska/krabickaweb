var path = require('path');
var webpack = require('webpack');

var loaders = [
  {
    "test": /\.js?$/,
    "exclude": /node_modules/,
    "loader": "babel",
    "query": {
      "presets": [
        "es2015",
        "react",
        "stage-0"
      ],
      "plugins": []
    }
  }
];

module.exports = {
  devtool: 'eval-source-map',
  entry: {
    main: path.resolve('webpack', 'src', 'main.js'),
    'thank-you': path.resolve('webpack', 'src', 'thank-you.js')
  },
  output: {
    path: path.resolve('build'),
    filename: '[name].js',
    publicPath: '/build/'
  },
  plugins: [
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ],
  module: {
    loaders: loaders
  }
};
