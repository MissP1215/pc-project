define(function(require, exports, module){
    var template = require('template');
    var public = {
        tpl: function(urlTpl, ele, data){
            $.ajax({
                type: 'GET',
                url: urlTpl,
                data: '',
                dataType: 'text',
                async: false,
                success: function(tpl){
                    var tpls = template.compile(tpl);
                    var datas = tpls(data);
                    ele.html(datas);
                }
            });
        },
        getUrlParam: function (param) {
            var uri = window.location.search;
            var re = new RegExp("" + param + "=([^&?]*)", "ig");
            return ((uri.match(re)) ? (decodeURIComponent(uri.match(re)[0].substr(param.length + 1))) : '');
        }      
    }
	exports.public = public;
});