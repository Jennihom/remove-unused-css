var fs = require('fs');
var page = require('webpage').create();
    page.settings.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53';
var caseUrl = [
    'http://m.amap.com/index/index',
    'http://m.amap.com/setting/index',
    'http://m.amap.com/nearby/index',
    'http://m.amap.com/navigation/index'
];

visitPage();
function visitPage(){
    if (caseUrl.length == 0) {
        phantom.exit();
    }else{
        page.open(caseUrl.pop(),function (s){
            setTimeout(function(){
                writePage();

            },5000);
        });

    }
}
function writePage(){
    var url = page.url;
    var fileUrl = url.split('m.amap.com/')[1].split('/');
    var fileName = fileUrl[0]+"_"+fileUrl[1];
    console.log('URL: ' + url);
    var path = 'html/'+fileUrl[0]+'/'+fileName+'.html';
    var content = page.evaluate(function() {
        comHtml = '<html lang="zh-CN"><head><link rel="stylesheet" href="../../css/style.css"></head><body>'+document.body.innerHTML+'</body></html>';
        return comHtml;
    });
    fs.write(path,content,'w');

    visitPage();

}