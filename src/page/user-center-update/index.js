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
        this.bindEvent();
    },
    onLoad : function(){
        //初始化左侧菜单
        navSide.init({
            name: 'user-center'
        });
        this.loadUserInfo();
    },
    bindEvent : function(){
        var _this = this;
        var validateResult
        $(document).on('click', '.btn-submit', function(){
            var userInfo ={
                phone    : $.trim($('#phone').val()),
                email    : $.trim($('#email').val()),
                question : $.trim($('#question').val()),
                answer   : $.trim($('#answer').val()),
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                _user.updateUserInfo(userInfo, function(res, msg){
                    _mm.successTips(msg);
                    window.location.href = './user-center.html';
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
            else{
                _mm.errorTips(validateResult.msg);
            }
        });
    },
    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _mm.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function(errMsg){

        });
    },
    validateForm :function(formData){
        var result = {
            status: false,
            message : ''
        };
        if(!_mm.validate(formData.phone, 'phone')){
            result.message = '手机号码格式不正确';
            return result;
        } 
        if(!_mm.validate(formData.email, 'email')){
            result.message = '邮件地址格式不正确';
            return result;
        } 
        if(!_mm.validate(formData.question, 'require')){
            result.message = '密码问题不能为空';
            return result;
        } 
        if(!_mm.validate(formData.answer, 'require')){
            result.message = '问题答案不能为空';
            return result;
        } 

        result.status = true;
        result.message = '验证通过';
        return result;
    }
    
    
}
$(function(){
    page.init();
});