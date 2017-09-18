var sex = location.href.split('/').pop();
$.get('/ajax/' + sex,function(d){
	var windowWidth=$(window).width();
	if(windowWidth<320){
		windowWidth=320;
	}
	
	new Vue({
	  el: '#app',
	  data: {
	  	screen_width:windowWidth,
	  	male:d.items,
	  	female:d.items
	  }
	});
	
},'json');