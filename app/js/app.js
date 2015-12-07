
//var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var isMobile = window.innerWidth < 800;

$(document).ready(function(){
	var setFrameHeight = function(){
		var windowHeight = window.innerHeight;
		if(!isMobile){
			 $(".ef-frame").css({height: windowHeight});
		}
	}
	setFrameHeight();
	window.addEventListener("resize", setFrameHeight);
})




/**
*  Module
*
* Description
*/
angular.module('eightfold', ['ngSanitize','ngAnimate','duScroll']).value('duScrollDuration', 1000)
.run(function($rootScope) {
    if(!window.history || !history.replaceState) {
      return;
    }
    $rootScope.$on('duScrollspy:becameActive', function($event, $element){
      //Automaticly update location
      var hash = $element.prop('hash').replace("#","#/");
      if (hash) {
        history.replaceState(null, null, hash);
      }
    });
})

.controller('efController', ['$scope','$timeout','$rootScope','$http', function($scope, $timeout, $rootScope, $http){

	$scope.isMobile =  isMobile;
	$scope.showAboutMore = false;

	$scope.hideAboutMore = function(){
		$scope.showAboutMore = false;
	}

	//Load assets
	console.log("Loading...");
	var images = ['img/lake.jpg','img/clouds.jpg','img/flowers.jpg'];
	var totalImagesLoaded = 0;

	var imageLoaded = function(){
		totalImagesLoaded++;
		if(totalImagesLoaded >= _.size(images)){
			console.log("...Assets Loaded");
		}
	}

	if(!isMobile){
		_.forEach(images, function(image) {
			var img = new Image();
			img.onLoad = imageLoaded();
			img.src = image;
		});
	}
	

	var finishLoad = function(delay){
		$timeout(function(){
			if($scope.isMobile){
				var videoLoaded = true;
			}else{
				var videoLoaded = $("video")[0].readyState === 4;
			}
			if(videoLoaded){
				$scope.loaded = true;
			}else{
				finishLoad(1000);
			}
		},delay);
	}
	
	finishLoad(1000)


	//Menu
	$scope.showMenu = false;
	$scope.toggleMenu = function(){
		$scope.showMenu = !$scope.showMenu;
	}



	//Typography Rotator
	$scope.animateIn = true;
	$scope.typography = [
		'partials/attention-background.html',
		'partials/emotion-background.html',
		'partials/perception-background.html'
		
	]
	$scope.currentTypography = 0;
	$scope.bannerTypography = $scope.typography[0];
	var animationTimeout = null;

	$scope.getNextTypography = function(num){
		if(animationTimeout) $timeout.cancel(animationTimeout);
		if(num !== undefined) $scope.currentTypography = num;
		if(frame == 2){
			$scope.bannerTypography = $scope.typography[$scope.currentTypography];
			animationTimeout =  $timeout(function(){
				$scope.currentTypography++
				if($scope.currentTypography >= $scope.typography.length) $scope.currentTypography = 0;
				$scope.getNextTypography();
			}, 5000)
		}else{
			animationTimeout = $timeout($scope.getNextTypography, 2000);
		}	
	}
	$scope.getNextTypography();


	//Animate mousewheel scroll
	var animating = false
	var animationTime = 1000;
	var frame = 0;
	var frames = _.map($(".ef-frame"), function(frame){
		return "#"+frame.id;
	})

	var handleScroll = function(event){
		if($scope.loaded && !$scope.isMobile){
			event.preventDefault();
			event.stopPropagation();
			if(animating === false){
				scrollToSection(event.originalEvent.deltaY > 0 ? 1 : -1);
			}
		}
	}
	var scrollToSection = function(direction){
		animating = true;
		var windowHeight = window.innerHeight;
		var nextFrame = frame + direction;
		
		if(nextFrame >= 0 && nextFrame < frames.length){
			frame += direction;
		}
		
		$('html, body').animate({scrollTop: windowHeight*frame},animationTime);
		animationTimeout = setTimeout(function(){
			animating = false;
		}, animationTime+250);	
	}

	$(document).on('mousewheel, wheel', handleScroll);

	$rootScope.$on('duScrollspy:becameActive', function($event, $element){
		frame = frames.indexOf($element.prop("hash"))
	})




	//Form Submit
	$scope.formData = {};
	$scope.contactStatus = null;

	$timeout(function(){
		$scope.formData.hidden = "human";
	},3000)

	$scope.submitForm = function(data) {
	  if(data !== true || $scope.formData.hidden != "human"){
	  	$scope.errorMessage = "Whoops! Looks like some fields aren't filled out properly.";
	  	$scope.contactStatus = "error";
	  	return;
	  }
	  $scope.contactStatus = "loading";
	  $scope.errorMessage = "An error occurred while attempting to send your message."
	  $http({
			method  : 'POST',
			url     : '_contact.php',
			data    : $.param($scope.formData),  
			headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  	
		})
	  .success(function(data, status, headers, config) {
	  	
	  	if(data == 1){
	  		console.log("success");
			$scope.contactStatus = "success"
			$scope.contactForm.$setPristine();
	  		$scope.formData = {};
			$timeout(function(){
				$scope.contactStatus = null;
			},2000)
	  	}else{
	  		console.log("error:", data, status);
	  		$timeout(function(){
		  		$scope.contactStatus = "error"
		  	},500)
	  	}
	  })
	  .error(function(data, status, headers, config){
	  	console.log("error:", data, status);
	  	$timeout(function(){
	  		$scope.contactStatus = "error"
	  	},500)
	  })
	};

}])