import path from 'path';

export default {
  module: {
    noParse: /node_modules\/json-schema\/lib\/validate\.js/,
    loaders: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main']
  },
  plugins: [

  ],
  externals: {
    "googleapis": "googleapis",
    'google-auth-library': 'google-auth-library'
  },
  // put your node 3rd party libraries which can't be built with webpack here
  // (mysql, mongodb, and so on..)

};
