var webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var WEBPACK_ENV       = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);
//获取html-webpack-plugin参数的方法
var getHtmlPluginConfig = function(name){
    return {
        template: './src/view/' + name + '.html',
        filename : 'view/' + name + '.html',
        inject   : true,
        hash     : true,
        chunks   : ['common', name]
    }
}
var config = {
    entry:{
        'common': ['./src/page/common/index.js'],
        'index': ['./src/page/index/index.js'],
        'login': ['./src/page/login/index.js']
    },
    output: {
        path: './dist',
        publicPath: '/dist',
        filename: '[name].js'
    },
    externals: {
        'jquery': 'window.jquery'
    },
    module: {
        loaders: [
            { test:/\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader")},
        { test:/\.(gif|png|jpg|bmp|woff|svg|eot|ttf)\??.*$/, loader:'url-loader?name=resource/[name].[ext]'}

        ]

    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename:'js/base.js'
        }),
        //把css单独打包到插件里
        new ExtractTextPlugin("css/[name].css"),
        //HTML模板的处理
        new HtmlWebpackPlugin(getHtmlPluginConfig("index")),
        new HtmlWebpackPlugin(getHtmlPluginConfig("login")),
    ]
};

//如果运行环境是dev，说明此时在开发环境下，把webpack-dev-server打包进去作为运行条件
//如果是online，说明在运行环境下，不需要该组件
if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
module.exports = config;