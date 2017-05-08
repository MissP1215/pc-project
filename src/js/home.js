define(function(require, exports) {
    var lang = require('lang').lang;
    var public = require('public').public;
    var tpl = public.tpl;
    var objList = null;
    var home = {
        init: function() {
            this.titleLi();
            this.eleBind();
        },
        eleBind: function() {
            var self = this;
            var content = $('.content');
            var contentUl = content.find('.titleIcon ul');
            var list = content.find('.list-box .list');
            contentUl.on('click', 'li', function() {
                var id = $(this).data('id');
                $(this).addClass('active').siblings().removeClass('active');
                self.listTplData(id);
            });
        },
        titleLi: function() {
            var self = this;
            $.ajax({
                type: 'GET',
                url: '../data/home.json',
                data: '',
                datatype: 'json',
                success: function(datas) {
                    var json = datas.data;
                    objList = json.list;
                    tpl('tpl/title.tpl.html', $('.content .titleIcon ul'), json);

                    var contentLi = $('.content .titleIcon ul li');
                    var id = 0;
                    contentLi.each(function(key, item) {
                        if($(item).hasClass('active')) {
                            id = $(item).data('id');
                        } 
                    });
                        self.listTplData(id);
                }
            });
        },
        listTplData: function(id) {
            var obj = {};
            $.each(objList, function(k, v) {
                if(parseInt(k, 10) === id) {
                    obj.list = v;
                }
            });
            tpl('tpl/list.tpl.html', $('.content .list-box'), obj);
        }
    }
    home.init();
});