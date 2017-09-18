$.get('/ajax/category',function(d){
	var windowWidth=$(window).width();
	new Vue({
	  el: '#app',
	  data: {
	  	screen_width:windowWidth,
	  	male:d.male,
	  	female:d.female
	  }
	});
},'json');