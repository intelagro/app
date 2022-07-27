var webpack = require('webpack')
const path = require('path')



module.exports = {
  mode: 'development',
  entry: './scr/app_vue/main.js',
  output: {
    path: path.resolve(__dirname, "scr/public/js"),
    filename: 'bundle.js'
  },
  module: {
    rules: [

      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: { loader: 'vue-loader' }
      }
    ]



  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' for webpack 1
    }
  },
  plugins: [
    
    /*
     new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: '"development"'
        }
      })
       // ...
     
      new webpack.DefinePlugin({
         'process.env': {
           NODE_ENV: JSON.stringify('production')
         }
       })*/


  ]
}
