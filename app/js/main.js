$(document).ready(function(){
	var frames = $(".ef-frame");
	var windowHeight = window.innerHeight;
	var frame = 0;
	var animationTimeout = null;
	var animating  = false;
	var animationTime = 1000;

	$(".ef-frame").height(windowHeight);

	//Hide down arrow
	/*$(document).on('mousewheel, wheel', function(event) {
		var downArrow = $(".down-arrow-container");
		if($(window).scrollTop() == 0){
			downArrow.show();
		}else{
			downArrow.hide();
		}
	});*/

	//Menu
	var showMenu = false;
	$('#menu').click(function(){
		if(showMenu){
			$('.menu-overlay').fadeOut(500);
			$('#menu').removeClass("close");
		}else{
			$('.menu-overlay').fadeIn(500);
			$('#menu').addClass("close");
		}
		showMenu = !showMenu;
	});

	$(window).scroll(function() {
		var scrollTop = $(window).scrollTop();
	    _.forEach($(".scroll-reveal"), function(item){
	    	if($(item).offset().top - window.innerHeight < scrollTop){
	    		$(item).addClass("revealed");
	    	}
	    })
	});

	//Scrolling
	/*$(document).on('mousewheel, wheel', function(event) {
		event.preventDefault();
		event.stopPropagation();
		if(animating === false){
			scrollToSection(event.originalEvent.deltaY > 0 ? 1 : -1);
		}
	});

	var scrollToSection = function(direction){
		animating = true;
		var nextFrame = frame + direction;
		
		if(nextFrame >= 0 && nextFrame < $(frames).size()){
			frame += direction;
		}
		
		$('html, body').animate({scrollTop: windowHeight*frame},animationTime);
		animationTimeout = setTimeout(function(){
			animating = false;
		}, animationTime);
	};*/
});