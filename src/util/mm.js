'use strict';

var conf = {
    serverHost : ''
};
var Hogan = require('hogan.js');
var _mm={
    request: function(param){
        var _this = this;
        $.ajax({
            type     : param.method || 'get',
            url      : param.url || '',
            dataType : param.type || 'json',
            data     : param.data || '',
            success  : function(res){
                if(0 === res.status){
                    typeof param.success === 'function' && param.success(res.data, res.msg);

                } 
                else if(10 === res.status){
                    _this.doLogin();
                }
                else if(1 === res.status){
                    typeof param.error === 'function' && param.error(res.msg);
                }
            },
            error   : function(err){
                typeof param.error === 'function' && param.error(err.statusText);
            }
        });
    },
    //获取服务器地址
    getServerUrl : function(path){
        return conf.host + path;
    },
    //获取url中相关的参数,参数name为键值
    getUrlParam : function(name){
        var reg    = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null

    },
    //把传入的模板和数据进行拼接
    renderHtml : function(htmlTemplate, data){
        var template = Hogan.compile(htmlTemplate);
        var result   = template.render(data);
        return result;
    },
    //成功提示
    successTips : function(msg){
        alert(msg || '操作成功！');

    },
    errorTips : function(msg){
        alert(msg || 'Something wrong!');
    },
    //字段验证，支持是否为空、手机、邮箱
    validate : function(value, type){
        var value = $.trim(value);
        //非空验证
        if('require' === type){
            return !!value;
        }
        //手机号验证
        if('phone' === type){
            return /^1\d{10}$/.test(value);
        }
        //邮箱验证
        if('email' === type){
            return /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value);
        }
    },
    //统一登录处理
    doLogin : function(){
        //登录的入口页面，未免特殊字符截断，所以进行encode
        window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
    }
}

module.exports = _mm;