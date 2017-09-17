'use strict';

require('./index.css');
var _user = require('../../service/user-service.js');
var _mm = require('../../util/mm.js');
require('../common/nav-simple/index.js');
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
    init: function(){
        this.bindEvent();
    },
    bindEvent: function(){
        var _this = this;
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
            username : $.trim($('#username').val()),          
            password : $.trim($('#password').val())
        };
        var isValidate = this.formValidate(formData);
        //验证成功
        if(isValidate.status){
            //提交
            _user.login(formData, function(res){
                window.location.href = _mm.getUrlParam('redirect') || './index.html';
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
        if( !_mm.validate(formData.password, 'require')){
            result.message = 'pwd不能为空';
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