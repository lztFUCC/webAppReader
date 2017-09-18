var id = location.href.split('?id=').pop();
$.get('/ajax/book?id=' + id,function(d){
	var windowWidth=$(window).width();
	new Vue({
		el:'#app',
		data:{
			screen_width:windowWidth,
			item:d.item,
			author_books:d.author_books,
			related:d.related
		},
		methods:{
			readBook:function(){
				location.href = "/reader"
			}
		}
	});
},'json');