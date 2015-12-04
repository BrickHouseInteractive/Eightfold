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
		// priority: 1,
		// terminal: true,
		scope: false, // {} = isolate, true = child, false/undefined = no change
		controller: function($scope, $element, $attrs, $transclude) {

			$scope.portfolio = {};
			$scope.thumbHeight = {height: window.innerHeight/2}

			//Get portfolio data
			$http.get('js/portfolio/portfolio.json')
				.success(function(data, status, headers, config){
					$scope.portfolio = data;
					console.log($scope.portfolio);
				})
				.error(function(data, status, headers, config){
					console.log(data);
				});

		},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		templateUrl: 'js/portfolio/ef-portfolio.html',
		replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			$scope.playVideo = function(video){
				$scope.video = $sce.trustAsResourceUrl(video);
				$scope.videoVisible = true;
			};
			$scope.hideVideo = function(){
				$scope.videoVisible = false;
			};
		}
	};
}]);