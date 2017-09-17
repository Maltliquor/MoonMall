'use strict';

require('./index.css');
var _user = require('../../service/user-service.js');
var _mm = require('../../util/mm.js');
require('../common/header/index.js');
require('../common/nav/index.js');
var navSide = require('../common/nav-side/index.css');
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
            name: 'user-pwd-update'
        });
    },
    bindEvent : function(){
        var _this = this;
        var validateResult
        $(document).on('click', '.btn-submit', function(){
            var userInfo ={
                password    : $.trim($('#password').val()),
                passwordNew : $.trim($('#password-new').val()),
                passwordConfirm : $.trim($('#password-confirm').val())
            },
            //更改用户密码
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                _user.updateUserPassword({
                    passwordOld : userInfo.password,
                    passwordNew : userInfo.passwordNew
                }, function(res, msg){
                    _mm.successTips(msg);
                    }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
            else{
                _mm.errorTips(validateResult.msg);
            }
        });
    },
    validateForm :function(formData){
        var result = {
            status: false,
            message : ''
        };
        //验证原密码是否为空
        if(!formData.password){
            result.message = '原密码不能为空';
            return result;
        } 
        if(!formData.passwordNew || formData.passwordNew.length < 6){
            result.message = '新密码不得少于六位';
            return result;
        } 
        if(!formData.passwordConfirm || formData.passwordNew != formData.passwordConfirm){
            result.message = '两次输入的密码不一致';
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