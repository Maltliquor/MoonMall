'use strict';

require('./index.css');
require('../common/nav/index.js');
require('../result/index.js');
require('../common/nav-simple/index.js');
require('../common/header/index.js');
require('../common/footer/index.css');

var navSide = require('../common/nav-side/index.js');

navSide.init({
    name : 'user-center'
});