define(function(require, exports){
    var langs = require('lang').lang;
    var public = require('public').public;
    var tpl = public.tpl;
    var web1 = {
        init: function() {
            this.titleLi();
            this.eleBind();

            
        },
        // eleBind: function() {
        //     var self = this;            
        //     var content = $('.content');
        //     var titleUl = content.find('.title ul');
        //     var list = content.find('.list-box .list');
        //     titleUl.on('click', 'li', function(){
        //         var id = $(this).data('id');
        //         $(this).addClass('active').siblings().removeClass('active');
        //         self.listLi(id);                
        //     });
        // },
        // titleLi: function() {
        //     var self = this;
        //     $.ajax({
        //         type: 'GET',
        //         url: '../data/web1.json',
        //         data: '',
        //         dataType: 'json',
        //         success: function(datas) {
        //             var json = datas.data;
        //             objList = json.list;
        //             tpl('tpl/title.tpl.html', $('.content .title ul'), json);
        //             var contentLi = $('.content .title ul li');
        //             var id = 0;
        //             contentLi.each(function(k, item) {
        //                 if($(item).hasClass('active')){
        //                     id = $(item).data('id');
        //                 }
        //             });
        //             self.listLi(id);                                    

        //         }
        //     });
        // },
        // listLi: function(id) {
        //     var obj = {};            
        //     $.each(objList, function(k, v){
        //       if(parseInt(k, 10) === id) {
        //           obj.list = v;
        //       }
        //     });
        //     console.log(obj)
        //     tpl('tpl/list.tpl.html', $('.content .list-box'), obj);
            
        // }
        
        eleBind: function() {
            var self = this;
            var content = $('.content');
            var contUl = content.find('.title ul');
            var contList = content.find('.list-box .list');
            contUl.on('click', 'li', function(){
                id = $(this).data('id');
                $(this).addClass('active').siblings().removeClass('active');
                self.listTplData(id);
            });
            
        },
        titleLi: function() {
            var self = this;
            $.ajax({
                type: 'GET',
                url: '../data/web1.json',
                data: '',
                dataType: 'json',
                success: function(datas) {
                    var json = datas.data;
                    objList = json.list;
                    tpl('tpl/title.tpl.html', $('.content .title ul'), json);
                    var contLi = $('.content .title ul li');
                    var id = 0;
                    contLi.each(function(k, item){
                        if($(item).hasClass('active')) {
                            id = $(item).data('id');
                        }
                        self.listTplData(id);
                    });
                }
            });

        },
        listTplData: function(id) {
            var obj = {};
            $.each(objList, function(k, v){
                if(parseInt(k, 10) === id) {
                    obj.list = v;
                }
            });
            tpl('tpl/list.tpl.html', $('.content .list-box'), obj);
        }

       
    }
    web1.init();
});