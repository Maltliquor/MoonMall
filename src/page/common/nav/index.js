/**
 * 
 */

'use strict';
require('./index.css');
var _mm = require('../../../util/mm.js');
var _user = require('../../../service/user-service.js');
var _cart = require('../../../service/cart-service.js');

//导航栏功能事件
var nav = {
    init : function(){
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;//既可以调用init（）又可以返回nav
    },
    //绑定登录登出等事件
    bindEvent : function(){
        $('.js-login').click(function(){
            _mm.doLogin();
        });
        $('.js-register').click(function(){
            window.location.href = './register.html'
        });
        $('.js-logout').click(function(){
            _user.logout(function(res){
                window.location.reload();
            },
            function(errMsg){
                _mm.errorTips(errMsg);
            });
        });
    },
    //加载用户信息
    loadUserInfo : function(res){
        _user.checkLogin(function(res){
                $('.user.not-login').hide().siblings('.user.login')
                .show().find('.username').text(res.username);
            },
            function(errMsg){
                _mm.errorTips(errMsg);
        });
    },
    //加载购物车数量
    loadCartCount : function(){
        _cart.getCartCount(function(res){
                $('.nav .cart-count').text(res||'0');
            },
            function(errMsg){
                $('.nav .cart-count').text('0');
                _mm.errorTips(errMsg);
        });
    }


}

module.exports = nav.init();