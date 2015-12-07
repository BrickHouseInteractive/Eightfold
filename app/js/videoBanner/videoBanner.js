angular.module("eightfold").
directive('videoBanner', ['$timeout', function($timeout){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		templateUrl: 'js/videoBanner/videoBanner.html',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {

			/*$scope.animateIn = true;
			$scope.bannerTypography = null;
			var typography = [
				'img/attention-background.svg',
				'img/emotion-background.svg',
				'img/perception-background.svg'
				
			]
			var currentTypography = 0;

			$scope.$watch("loaded", function(newVal){
				if(newVal == true){
					$timeout(function(){
						getNextTypography();
					},1000)
				}
			})

			var getNextTypography = function(){
				$scope.animateIn = true;
				$scope.bannerTypography = typography[currentTypography];
				$timeout(function(){
					$scope.animateIn = false;
					$timeout(function(){
						$scope.bannerTypography = null;
					}, 500)
					$timeout(function(){
						currentTypography++
						if(currentTypography >= typography.length) currentTypography = 0;
						getNextTypography();
					}, 750)
				}, 9000)
			}*/
		}
	};
}]);