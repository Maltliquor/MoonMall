'use strict';
require('./index.css');
var _mm = require('../../../util/mm.js');

//通用页面头部
var header = {
    init : function(){

        this.bindEvent();
        return this;//既可以调用init（）又可以返回nav
    },
    onLoad : function(){
        var keyword = _mm.getUrlParam('keyword');
        if(keyword){
            $('#search-input').val(keyword);
        }
    },
    bindEvent : function(){
        var _this = this;
        //点击搜索按钮以后，做搜索提交
        $('#search-input').click(function(){
            _this.searchSubmit();
        });
        //输入回车后做搜索提交
        $('#search-input').keyup(function(e){
            if(e.keyCode === 13){
                _this.searchSubmit();
            }
        })
    },
    searchSubmit : function(){
        var keyword = $.trim($('#search-input').val());
        //如果输入框有内容，提交搜索
        if(keyword){
            window.location.href = './list.html?keyword=' + keyword;
        }
        //如果输入框无内容，返回主界面
        else{
            _mm.goHome();
        }
    }

};

header.init();

