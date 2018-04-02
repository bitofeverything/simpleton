const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const { dependencies } = require('./package.json')

module.exports = {
    entry: [
        'webpack/hot/poll?1000',
        './src/index'
    ],
    watch: true,
    target: 'node',
    externals: [nodeExternals({
        whitelist: ['webpack/hot/poll?1000']
    }),
      Object.keys(dependencies || {})],
    module: {
        rules: [{
            test: /\.js[x]?$/,
            use: 'babel-loader',
            exclude: /node_modules/
        }]
    },
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            "process.env": {
                "BUILD_TARGET": JSON.stringify('bot')
            }
        }),
    ],
    output: {
        path: path.join(__dirname, '.build'),
        filename: 'bot.js'
    },
    stats: {
      colors: true,
      hash: false,
      version: false,
      timings: false,
      assets: false,
      chunks: false,
      modules: false,
      reasons: false,
      children: false,
      source: false,
      errors: true,
      errorDetails: false,
      warnings: false,
      publicPath: false
    }

}
