const path = require('path');
const fs =  require('fs');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const lessToJs = require('less-vars-to-js');
const webpackPWAManifest = require('webpack-pwa-manifest');

const themeLess = lessToJs(fs.readFileSync(path.join(__dirname,'./src/assets/styles.less'), 'utf8'))
const newHtml = new htmlWebpackPlugin({ title: 'Build', filename: 'index.html', template: './public/index.html' });
const cleanDist = new cleanWebpackPlugin(['dist']);
const miniCss = new miniCssExtractPlugin({
    filename: '[name].[hash].css',
    chunkFilename: '[name].[id].css'
})
const Workbox = new WorkboxPlugin.GenerateSW({
    clientsClaim: true,
    skipWaiting: true,
    runtimeCaching: [{
        urlPattern: new RegExp('http://192.168.123.63:8081/'),
        handler: 'staleWhileRevalidate'
      }]
})
const pwaManifest =  new webpackPWAManifest({
    name: 'Super de Todo PWA',
    short_name: 'SPA App',
    description: 'Super de Todo Progresive Web App',
    background_color: '#ffffff',
    start_url: '/',
    theme_color: '#faad14',
    crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
    icons: [
      {
        src: path.resolve('src/assets/logo.png'),
        sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
      },
      {
        src: path.resolve('src/assets/logo.png'),
        size: '1024x1024' // you can also use the specifications pattern
      }
    ]
})

module.exports = {
    entry: {
        polyfill: 'babel-polyfill',
        app: './src/index.js',
    },
    module: {
        rules: [
            { 
                test: /\.(js|jsx)$/, 
                exclude: /node_modules/, 
                use: { 
                    loader: 'babel-loader',
                    options:{
                        plugins:[
                            ["import", {"libraryName": "antd", "style": true} ]
                        ]
                    }
                },
            },
            { 
                test: /\.(css|less)$/, 
                use: [ 
                    miniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: true }},
                    { loader: 'less-loader', options: { sourceMap: true, modifyVars: themeLess, javascriptEnabled: true }}
                ] 
            },
            {
              test: /\.(png|jpg|gif)$/,
              use:[
                {
                  loader: 'file-loader',
                  options: {
                    name: '[path][name].[ext]',
                    context: ''
                  }
                }
              ]
            }
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        newHtml,
        cleanDist,
        miniCss,
        Workbox,
        pwaManifest
    ],
    devtool: 'inline-source-map',
}
