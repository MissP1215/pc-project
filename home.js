define(function(require, exports, module) {
    var lang = require('lang').lang;
    var public = require('public');
        console.log(public);
    
    var home = {
        init: function() {
            this.eleBind();
        },
        eleBind: function() {
            var content = $('.content');
            var titleLi = content.find('.titleIcon ul li');
            var list = content.find('.list-box .list');
            titleLi.click(function(){
                var index = $(this).index();
                $(this).addClass('active').siblings().removeClass('active');
                list.eq(index).show().siblings().hide();
            });
        }
    }
    home.init();
});