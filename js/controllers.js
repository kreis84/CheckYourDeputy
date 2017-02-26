angular.module('cyd')

.controller('presentationController', function($scope, getDeputyList)
{
	$scope.deputyList = [];
	getDeputyList
	.then(function(response)
	{
		$scope.deputyList = response;
	});
});