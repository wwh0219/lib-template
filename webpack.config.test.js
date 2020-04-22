const merge = require('webpack-merge')
const base = require('./webpack.config')
const config = merge(base, {})
config.output = {}
config.externals = undefined
module.exports = config
