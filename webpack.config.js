const json = require('./package.json')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const path = require('path')
const resolve = (dir) => path.resolve(process.cwd(), dir)
const unshiftIstanbulLoader = (loaders) => {
  if (process.env.MODE === 'test') {
    loaders.unshift('istanbul-instrumenter-loader')
  }
  return loaders
}
const config = {
  mode: 'production',
  entry: resolve('./src/index.ts'),
  output: {
    path: resolve('dist'),
    filename: `index.${process.env.MODULE}.js`,
    libraryTarget: 'commonjs2'
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: unshiftIstanbulLoader(['babel-loader'])
      },
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        use: unshiftIstanbulLoader([
          'babel-loader',
          'ts-loader'
        ])
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  externals: [],
  devtool: '#source-map'
}
if (process.env.MODULE === 'umd') {
  config.output = {
    ...config.output,
    libraryTarget: 'umd',
    library: json.namespace
  }
} else if (process.env.MODULE === 'cjs') {
  config.externals = [
    ...(config.externals),
    (context, request, callback) => {
      if (/core-js|corejs|tslib|@babel\/runtime/g.test(request)) {
        return callback(null, 'commonjs ' + request)
      }
      callback(undefined, undefined)
    }
  ]
}
module.exports = config
