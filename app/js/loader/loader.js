angular.module("eightfold").
directive('loader', ['$timeout', function($timeout){
	// Runs during compile
	return {
		template: '<div ng-class="{\'fade-out\':loaded}" class="banner-logo" ng-include="\'img/ef-logo.svg\'"></div>',
		replace: true,
		controller: function($scope, $element, $attrs, $transclude) {

			console.log("Loading...");
			var images = ['img/emotion-background.svg','img/attention-background.svg','img/perception-background.svg','img/clouds.png'];
			var totalImagesLoaded = 0;
			var assetsLoaded = false;

			var imageLoaded = function(){
				totalImagesLoaded++;
				if(totalImagesLoaded >= _.size(images)){
					console.log("...Assets Loaded");
					assetsLoaded = true
				}
			}

			_.forEach(images, function(image) {
				var img = new Image();
				img.onLoad = imageLoaded();
				img.src = image;
			});

			var finishLoad = function(delay){
				$timeout(function(){
					if(assetsLoaded === true){
						$scope.loaded = true;
					}else{
						finishLoad(1000);
					}
				},delay);
			}
			
			finishLoad(5000)
			
		}
	};
}]);