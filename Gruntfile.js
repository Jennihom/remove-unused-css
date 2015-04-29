var fs = require("fs");
module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uncss: (function () {
            var filec = fs.readdirSync('html'),
                cssfileurl = {};
            cssfileurl.dist = {};
            cssfileurl.dist.files = {};
            var urlPath = [];

            filec.forEach(function(item,i){
                fs.readdirSync('html/'+item).forEach(function(filename,j){
                    urlPath.push('html/'+item+'/'+filename);
                });
            });
            console.log(urlPath);
            cssfileurl.dist.files = {'newcss/style.css' : urlPath};

            return cssfileurl
            
        })()
    });
    grunt.loadNpmTasks('grunt-uncss');
    grunt.registerTask('css', ['uncss']);

   
}
