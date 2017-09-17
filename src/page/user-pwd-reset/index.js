'use strict';

require('./index.css');
var _user = require('../../service/user-service.js');
var _mm = require('../../util/mm.js');
require('../common/nav-simple/index.css');
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
    data : {
        username : '',
        question : '',
        answer   : '',
        token    : ''
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.loadStepUsername();
    },
    bindEvent: function(){
        var _this = this;
        //输入用户名及下一步
        $('#submit-username').click(function(){
            var username = $.trim($('#username').val());
            if(username){
                _user.getQuestion(username, function(res){
                    _this.data.username = username;
                    _this.data.question = res;
                    _this.loadStepQuestion();
                }, function(errMsg){
                    formError.show(errMsg);
                });
            }
            else{
                formError.show("请输入用户名");
            }

        });
        //输入密码提示问题答案及下一步
        $('#submit-question').click(function(){
            var answer = $.trim($('#answer').val());
            //答案存在
            if(answer){
                _user.checkAnswer({
                    username : _this.data.username,
                    question : _this.data.question,
                    answer   : answer
                }
                    , function(res){
                    _this.data.answer = answer;
                    _this.data.token = res;
                    _this.loadStepPassword();
                }, function(errMsg){
                    formError.show(errMsg);
                });
            }
            else{
                formError.show("请输入密码提示问题的答案");
            }

        });
        //输入新密码及下一步
        $('#submit-password').click(function(){
            var password = $.trim($('#password').val());
            //存在
            if(password && password.length >= 6){
                _user.resetPassword({
                    username : _this.data.username,
                    passwordNew : password,
                    forgetToken   : _this.data.token
                }, function(res){
                   window.location.href = './result.html?type=pass-reset'
                }, function(errMsg){
                    formError.show(errMsg);
                });
            }
            else{
                formError.show("请输入不少于六位的新密码");
            }

        });
    },
    //加载输入用户名的一步
    loadStepUsername : function(){
        $(".step-username").show();

    },
    loadStepQuestion : function(){
        //清除错误提示
        formError.hide();
        //
        $(".step-username").hide().siblings('.step-question').show()
        .find('.question').text(this.data.question);

    },
    loadStepPassword : function(){
        //清除错误提示
        formError.hide();
        //
        $(".step-question").hide().siblings('.step-password').show();
        
    }

}
$(function(){
    page.init();
});