

'use strict';
require('./index.css');
var _mm = require('../../../util/mm.js');
var templateIndex = require('./index.string');

//导航栏功能事件
var navSide = {
    //name表示处于激活状态的项
    //navList表示菜单里有什么项，每一项名字、链接、激活状态
    option : {
        name : '',
        navList : [
            {name : 'user-center', desc : '个人中心', href : './user-center.html'},
            {name : 'user-pwd-update', desc : '修改密码', href : './pwd-update.html'},
            {name : 'order-list', desc : '我的订单', href : './order-list.html'},
            {name : 'about', desc : '关于MMall', href : './about.html'}
        ],

    },
    init : function(option){
        //合并选项，只针对第一层
        $.extend(this.option, option);
        this.renderNav();
        return this;//既可以调用init（）又可以返回nav
    },
    //渲染导航菜单
    renderNav : function(){
        //计算active数据
        for(var i = 0, iLength = this.option.navList.length; i < iLength; i++){
            if(this.option.navList[i].name === this.option.name){
                this.option.navList[i].isActive = true;
            }
        }
        var navHtml = _mm.renderHtml(templateIndex, {
            navList : this.option.navList
        });
        //把HTML放进容器
        $('.nav-side').html(navHtml);
    }


}

module.exports = navSide;