define(function(require, exports){
    var lang = require('lang').lang;
    var public = require('public').public;
    var tpl = public.tpl;
    // var getUrlParam = public.getUrlParam;

    var objList = null;
    var textId  = 0;
    var webpage = {
        init: function(){
            this.titleLi();
            this.eleBind();
        },
        eleBind: function(){ 
            var self      = this;
            var content   = $('.content');
            var contentUl = content.find('.title ul');
            var listBox   = content.find('.list-box .list');

            contentUl.on('click', 'li', function(){
                var index = $(this).index(); 
                var id    = $(this).data('id');
                $(this).addClass('active').siblings().removeClass('active');
                self.listTplData(id);
            });
        },
        titleLi: function(){
            var self      = this;
            $.ajax({
                type: 'GET',
                url: '../data/webpage.json',
                data: '',
                dataType: 'json',
                success: function(data){
                    var json = data.data;

                    objList = json.list;
                    tpl('tpl/title.tpl.html', $('.content .title ul'), json);
                    //  默认的效果
                    var contentLi = $('.content .title ul li');
                    var id = 0;
                    contentLi.each(function(key, item){
                        if ($(item).hasClass('active')) {
                            id = $(item).data('id');
                        }
                    });
                    console.log(id)
                    self.listTplData(id);
                }
            });
        },
        listTplData: function (id) {
            var obj = {};
            $.each(objList, function(k, v){
                if(parseInt(k, 10) === id){
                    obj.list = v;
                }
            });

            tpl('tpl/list.tpl.html', $('.content .list-box'), obj);
        }
    }
    webpage.init();
});