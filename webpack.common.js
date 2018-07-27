const path = require('path');
const fs =  require('fs');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const lessToJs = require('less-vars-to-js')

const themeLess = lessToJs(fs.readFileSync(path.join(__dirname,'./src/assets/styles.less'), 'utf8'))
const newHtml = new htmlWebpackPlugin({ title: 'Build', filename: 'index.html', template: './public/index.html' });
const cleanDist = new cleanWebpackPlugin(['dist']);
const miniCss = new miniCssExtractPlugin({
    filename: '[name].[hash].css',
    chunkFilename: '[name].[id].css'
})


module.exports = {
    entry: {
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
    ]
}
