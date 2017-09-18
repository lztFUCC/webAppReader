$.get('/ajax/rank',function(d){
	var windowWidth=$(window).width();
	//console.log(d.items[0].description)
	for(var i=0;i< d.items.length;i++){
		//原数据有换行，所以用\n拆分组成数组
		d.items[i].description = d.items[i].description.split('\n');
	}
	
	new Vue({
	  el: '#app',
	  data: {
	  	screen_width:windowWidth,
	  	rank:d.items
	  }
	});
},'json');