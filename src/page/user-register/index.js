'use strict';

require('./index.css');
var _user = require('../../service/user-service.js');
var _mm = require('../../util/mm.js');
require('../common/nav-simple/index.js');

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
    init: function(){
        this.bindEvent();
    },
    bindEvent: function(){
        var _this = this;
        //验证username
        $('#username').blur(function(){
            var username = $.trim($(this).val());
            if(username == null) return;
            //异步验证用户名是否存在
            _user.checkUserName(username, function(username){
                formError.hide();
            }, function(errMsg){
                formError.show(errMsg);
            })
        });

        //注册按钮的点击
        $('#submit').click(function(){
            _this.submit();
        });
        //按下回车也会提交
        $('.user-content').keyup(function(e){
            if(e.keyCode === 13){
                _this.submit();
            }
        });
    },
    /* 提交表单 */
    submit: function(){
        var formData = {
            username        : $.trim($('#username').val()),          
            password        : $.trim($('#password').val()),
            passwordConfirm : $.trim($('#password-confirm').val()), 
            phoneNumber     : $.trim($('#phone-number').val()),          
            email           : $.trim($('#email').val()),
            question        : $.trim($('#pwd-question').val()), 
            answer          : $.trim($('#pwd-answer').val())
        };
        var isValidate = this.formValidate(formData);
        //验证成功
        if(isValidate.status){
            //提交
            _user.register(formData, function(res){
                window.location.href = './result.html?type=register';
            }, function(errMsg){
                formError.show(errMsg);
            });
        }
        //验证失败
        else{
            //错误提示
            formError.show(isValidate.message);
        }

    },
    formValidate: function(formData){
        var result = {
            status: false,
            message : ''
        };
        if( !_mm.validate(formData.username, 'require')){
            result.message = '用户名不能为空';
            return result;
        }
        
        if(!_mm.validate(formData.password, 'require')){
            result.message = 'pwd不能为空';
            return result;
        } 
        if(formData.password.length < 6){
            result.message = '密码长度不能少于六位';
            return result;
        }
        if(formData.password !== formData.passwordConfirm){
            result.message = '两次密码输入不一致';
            return result;
        }
        if(!_mm.validate(formData.phoneNumber, 'phone')){
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