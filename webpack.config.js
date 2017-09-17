var webpack           = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var WEBPACK_ENV       = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);
//获取html-webpack-plugin参数的方法
var getHtmlPluginConfig = function(name, title){
    return {
        template: './src/view/' + name + '.html',
        filename : 'view/' + name + '.html',
        title    : title,
        inject   : true,
        hash     : true,
        chunks   : ['common', name]
    }
}
var config = {
    entry:{
        'common'          : ['./src/page/common/index.js'],
        'index'           : ['./src/page/index/index.js'],
        'user-login'      : ['./src/page/user-login/index.js'],
        'user-register'   : ['./src/page/user-register/index.js'],      
        'user-pwd-reset'  : ['./src/page/user-pwd-reset/index.js'],             
        'user-pwd-update'  : ['./src/page/user-pwd-update/index.js'],                    
        'user-center'     : ['./src/page/user-center/index.js'],             
        'user-center-update'  : ['./src/page/user-center-update/index.js'],                    
        'result'          : ['./src/page/result/index.js']
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
            { test:/\.(gif|png|jpg|bmp|woff|svg|eot|ttf)\??.*$/, loader:'url-loader?name=resource/[name].[ext]'},
            { test:/\.string$/, loader:'html-loader'}
         
        ]

    },
    resolve : {
        ailas : {
            node_modules : __dirname + '/node_modules',
            util    : __dirname + '/src/util',
            page    : __dirname + '/src/page',
            service : __dirname + '/src/service',
            image   : __dirname + '/src/image',
        }
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename:'js/base.js'
        }),
        //把css单独打包到插件里
        new ExtractTextPlugin("css/[name].css"),
        //HTML模板的处理
        new HtmlWebpackPlugin(getHtmlPluginConfig("index","首页")),
        new HtmlWebpackPlugin(getHtmlPluginConfig("user-login", "用户登录")),
        new HtmlWebpackPlugin(getHtmlPluginConfig("user-pwd-reset", "找回密码")),
        new HtmlWebpackPlugin(getHtmlPluginConfig("user-pwd-update", "修改密码")),       
        new HtmlWebpackPlugin(getHtmlPluginConfig("user-center", "个人中心")),
        new HtmlWebpackPlugin(getHtmlPluginConfig("user-center-update", "修改个人信息")),       
        new HtmlWebpackPlugin(getHtmlPluginConfig("result", "操作结果")),
        new HtmlWebpackPlugin(getHtmlPluginConfig("user-register", "用户注册"))
    ]
};

//如果运行环境是dev，说明此时在开发环境下，把webpack-dev-server打包进去作为运行条件
//如果是online，说明在运行环境下，不需要该组件
if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}
module.exports = config;