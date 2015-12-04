/**
*  Module
*
* Description
*/
angular.module('eightfold', ['ngSanitize'])
.controller('efController', ['$scope', function($scope){

	var frames = 3
	var windowHeight = window.innerHeight;
	var frame = 0;
	var animationTimeout = null;
	var animating  = false;
	var animationTime = 1000;
	$scope.isMobile =  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

	//if(!$scope.isMobile) $(".ef-frame").height(windowHeight);

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
		
		if(nextFrame >= 0 && nextFrame < frames){
			frame += direction;
		}
		
		$('html, body').animate({scrollTop: windowHeight*frame},animationTime);
		animationTimeout = setTimeout(function(){
			animating = false;
		}, animationTime);

	}*/

}])