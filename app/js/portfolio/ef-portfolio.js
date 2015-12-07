/**
* eightfold Module
*
* Description
*/
angular.module('eightfold').

directive('efPortfolio', ['$http','$sce', function($http, $sce){
	// Runs during compile
	return {
		name: 'efPortfolio',
		scope: false, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {

			$scope.portfolio = {};
			if(!$scope.isMobile){
				$scope.thumbHeight = {height: window.innerHeight/2}
				window.addEventListener("resize", function(){
					$scope.thumbHeight = {height: window.innerHeight/2};
					$scope.$apply();
				});
			}
			

			//Get portfolio data
			$http.get('js/portfolio/portfolio.json')
				.success(function(data, status, headers, config){
					$scope.portfolio = data;
				})
				.error(function(data, status, headers, config){
					console.log(data);
				});

		},
		templateUrl: 'js/portfolio/ef-portfolio.html',
		replace: true,
		link: function($scope, iElm, iAttrs, controller) {
			$scope.playVideo = function(video){
				$scope.video = $sce.trustAsResourceUrl(video+'?autoplay=true&color=333');
				$scope.videoVisible = true;
			};
			$scope.hideVideo = function(){
				$scope.videoVisible = false;
			};
		}
	};
}]);