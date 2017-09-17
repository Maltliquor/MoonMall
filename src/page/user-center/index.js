'use strict';

require('./index.css');
var _user = require('../../service/user-service.js');
var _mm = require('../../util/mm.js');
var templateIndex =require('./index.string');
require('../common/header/index.js');
require('../common/nav/index.js');
var navSide = require('../common/nav-side/index.js');
require('../common/footer/index.css');
//表单内错误提示
var formError = {
    show: function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide: function(errMsg){
        $('.error-item').hide().find('.err-msg').text('');
    }
};
//登录页面
var page={
    init : function(){
        this.onLoad();
    },
    onLoad : function(){
        //初始化左侧菜单
        navSide.init({
            name: 'user-center'
        });
        this.loadUserInfo();
    },
    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _mm.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function(errMsg){

        });
    }
    
    
}
$(function(){
    page.init();
});