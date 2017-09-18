var koa = require('koa');
var controller = require('koa-route');
var app = koa();

//引入querystring模块
var querystring = require('querystring');

//设置页面渲染引擎
var views = require('co-views');
var render = views('./view', {
    map: { html: 'ejs' }
});

//引入数据处理模块
var service = require('./service/webAppService.js');

//引入koa-static中间件
var koa_static = require('koa-static-server');
app.use(koa_static({
    rootDir: './static',
    rootPath: '/static',
    maxage: 0
}))

//调用ejs模板
//配置首页
app.use(controller.get('/', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('index', { title: '首页' });
}));

//配置搜索页
app.use(controller.get('/search', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('search', { nav: '搜索' });
}));

//配置某本书籍的页面
app.use(controller.get('/book', function* () {
    this.set('Cache-Control', 'no-cache');
    var params = querystring.parse(this.req._parsedUrl.query);
    var bookId = params.id;
    this.body = yield render('book', {nav:'书籍详情', bookId: bookId });
}));

//配置male
app.use(controller.get('/male', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('male',{nav:'男生频道'});
}));

//配置female
app.use(controller.get('/female', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('female',{nav:'女生频道'});
}));

//配置rank
app.use(controller.get('/rank', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('rank',{nav:'排行'});
}));

//配置category
app.use(controller.get('/category', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('category',{nav:'分类'});
}));

//配置阅读器reader
app.use(controller.get('/reader', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('reader');
}));


//拉取本地数据
//index数据
app.use(controller.get('/ajax/index', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_index_data();
}));

//rank数据
app.use(controller.get('/ajax/rank', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_rank_data();
}));

//male数据
app.use(controller.get('/ajax/male', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_male_data();
}));

//famale数据
app.use(controller.get('/ajax/female', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_female_data();
}));

//category数据
app.use(controller.get('/ajax/category', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_category_data();
}));
//某本书籍的数据
app.use(controller.get('/ajax/book', function* () {
    this.set('Cache-Control', 'no-cache');
    var params = querystring.parse(this.req._parsedUrl.query);
    var id = params.id;
    if (!id) {
        id = '';
    }
    this.body = service.get_book_data(id);
}));

//search数据
app.use(controller.get('/ajax/search', function* () {
    this.set('Cache-Control', 'no-cache');
    
    var params = querystring.parse(this.req._parsedUrl.query);
    var start = params.start;
    var end = params.end;
    var keyword = params.keyword;
    this.body = yield service.get_search_data(start, end, keyword);
}));

//阅读器数据
app.use(controller.get('/ajax/chapter', function* () {
    this.set('Cache-Control', 'no-cache');
    this.body = service.get_chapter_data();
}));
app.listen(3000);
console.log('koa server start')