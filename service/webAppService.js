var fs = require('fs');
exports.get_test_data = function () {
    var content = fs.readFileSync('./mock/test.json', 'utf-8')
    return content;
}
//引入阅读器的数据
exports.get_chapter_data = function () {
    var content = fs.readFileSync('./mock/chapter.json', 'utf-8')
    return content;
}

//引入home.json
exports.get_index_data = function () {
    var content = fs.readFileSync('./mock/home.json', 'utf-8')
    return content;
}

//引入rank.json
exports.get_rank_data = function () {
    var content = fs.readFileSync('./mock/rank.json', 'utf-8')
    return content;
}

//引入male.json
exports.get_male_data = function () {
    var content = fs.readFileSync('./mock/channel/male.json', 'utf-8')
    return content;
}
//引入female.json
exports.get_female_data = function () {
    var content = fs.readFileSync('./mock/channel/female.json', 'utf-8')
    return content;
}
//引入category.json
exports.get_category_data = function () {
    var content = fs.readFileSync('./mock/category.json', 'utf-8')
    return content;
} 
//引入某本书籍的数据
exports.get_book_data = function (id) {
    //判断id是否存在,不存在就用默认的
    if(!id){
        id='18218';
    }
    
    //检测该书籍的数据是否存在，不存在就用默认的
    if(fs.existsSync('./mock/book/' + id + '.json')){
    	return fs.readFileSync('./mock/book/'+ id + '.json', 'utf-8');
    }else{
    	return  fs.readFileSync('./mock/book/18218.json', 'utf-8');
    }
    
   
}
//创建搜索方法
exports.get_search_data = function (start, end, keyword) {
    return function (cb) {
        var http = require('http');
        var qs = require('querystring');
        var data = {
            s: keyword,
            start: start,
            end: end
        };
        var content = qs.stringify(data);
        var http_request = {
            hostname: 'dushu.xiaomi.com',
            port: 80,
            path: '/store/v0/lib/query/onebox?' + content
        }
        req_obj = http.request(http_request, function (_res) {
            var content = '';
            _res.setEncoding('utf8');
            _res.on('data', function (chunk) {
                content += chunk;
            });
            _res.on('end', function () {
                cb(null, content);
            })

        });
        req_obj.on('error', function () {

        })
        req_obj.end();
    }
}