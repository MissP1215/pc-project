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
                var index = $(this).index();  //获取下标    listBox.eq(index)是对应下标的内容
                var id    = $(this).data('id');  //data里面的id等于模板data自定义的属性名称。即获取模板data-id
                $(this).addClass('active').siblings().removeClass('active');//点击什么，就出现什么内容，这样的效果使用下标关联。
                self.listTplData(id);

                // listBox.eq(index).show().siblings().hide();//eq获取对应标签的方法.当点击下标对应的内容时，就会显示关联的内容，其他兄弟节点就会隐藏。
                // listBox.eq(index).addClass('test-show').siblings().removeClass('test-show');
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
                        if ($(item).hasClass('active')) {  //默认值。循环出有active样式列表对应的内容。
                            id = $(item).data('id');        //id等于对应列表的id
                        }
                    });
                    console.log(id)
                    self.listTplData(id);  //传哪一个id，就会得出哪一个id的内容
                }
            });
        },
        listTplData: function (id) {
            var obj = {};
            $.each(objList, function(k, v){
                if(parseInt(k, 10) === id){  //用objList里面的键。和id做匹配，循环出对应id内容。
                    obj.list = v;
                }
            });

            tpl('tpl/list.tpl.html', $('.content .list-box'), obj);
        }
    }
    webpage.init();
});