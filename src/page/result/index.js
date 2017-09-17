'use strict';

require('./index.css');
var _mm = require('../../util/mm.js');
require('../common/nav-simple/index.js');

$(function(){
    var type = _mm.getUrlParam('type') || 'default';
    var $element = $('.' + type + '-success');
    $element.show();


});