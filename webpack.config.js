const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev =
  process.env.NODE_ENV !== 'production' && process.argv.indexOf('-p') === -1;

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/index.html',
  filename: 'index.html',
  hash: true,
  inject: 'body',
});
const ExtractTextPluginConfig = new ExtractTextPlugin({
  filename: 'style.css',
});
const DefinePluginConfig = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
  },
});
const UglifyPluginConfig = new webpack.optimize.UglifyJsPlugin({
  compress: {
    screw_ie8: true,
    warnings: true,
  },
  output: {
    comments: false,
    screw_ie8: true,
  },
  sourceMap: false,
});

const config = {
  entry: [
    'react-hot-loader/patch',
    './client/index.jsx',
  ],
  output: {
    filename: '[name].js',
    path: path.resolve('dist'),
  },
  resolve: {
    alias: {
      App: 'client/App.jsx',
      Components: 'client/components',
      Containers: 'client/containers',
      styles: 'client/styles/style.sass',
    },
    extensions: ['.js', '.jsx'],
    modules: [
      path.resolve(__dirname),
      'node_modules',
      './client/components',
      './client/containers',
    ],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loaders: [
          'babel-loader',
          'eslint-loader',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 1000,
        },
      },
    ],
  },
  plugins: [HtmlWebpackPluginConfig],
};

if (isDev) {
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  );

  config.module.rules.push({
    test: /\.s(a|c)ss$/,
    use: [
      {
        loader: 'style-loader',
        options: { sourceMap: true },
      },
      {
        loader: 'css-loader',
        options: { sourceMap: true },
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => [autoprefixer],
          sourceMap: true,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          outputStyle: 'expanded',
          sourceMap: true,
        },
      },
    ],
  });

  config.devServer = {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    hot: true,
    overlay: true,
    port: 3002,
    proxy: {
      '/api': 'http://localhost:3000',
    },
    stats: {
      cached: false,
      chunks: false,
      chunkModules: false,
      chunkOrigins: false,
      hash: false,
      maxModules: 0,
      modules: false,
      publicPath: false,
      reasons: false,
      source: false,
      timings: false,
      version: false,
    },
    watchContentBase: true,
  };

  config.devtool = 'cheap-module-eval-source-map';
} else {
  config.plugins.push(
    DefinePluginConfig,
    ExtractTextPluginConfig,
    UglifyPluginConfig,
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  );

  config.module.rules.push({
    test: /\.s(a|c)ss$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: { minimize: true },
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [autoprefixer],
          },
        },
        {
          loader: 'sass-loader',
        },
      ],
    }),
  });
}

module.exports = config;
