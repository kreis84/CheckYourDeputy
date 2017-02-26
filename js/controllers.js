angular.module('cyd')

.controller('presentationController', function($scope, $rootScope, getDeputyList, particularDeputy)
{
	$scope.deputyList = [];
	$scope.particularDeputy = {};
	$scope.searchByName = '';
	$scope.searchByGroup = '';
	$scope.orderByVar = 'name';
	$scope.showDeputyList = true;
	$scope.showParticularDeputy = false;

	getDeputyList
	.then(function(response)
	{
		$scope.deputyList = response;
	});

	$scope.selectDeputy = function(id)
	{
		console.log('selectDeputy: '+id);
		particularDeputy.get(id)
		.then(function(response)
		{
			$scope.particularDeputy = response.data.data;
			console.log(response);
			$scope.showDeputyList = false;
			$scope.showParticularDeputy = true;
		}, function(error)
		{
			alert(error.statusText);
			$scope.alertShow = true;
		});
		
	};

	$scope.back = function()
	{
		$scope.showDeputyList = true;
		$scope.showParticularDeputy = false;
	}


	$rootScope.$on('searchByNameChanged', function(event, text)
	{
		$scope.searchByName = text;
	});

	$rootScope.$on('orderByChange', function(event, text){
		$scope.orderByVar = text;
	});

	$rootScope.$on('searchByGroupChange', function(event, text)
	{
		$scope.searchByGroup = text;
	});

})

.controller('inputController', function($scope, $rootScope)
{
	$scope.searchByName = '';
	$scope.searchByGroup = '';
	$scope.filter = '';

	$scope.$watch('searchByName',function()
	{
		$rootScope.$emit('searchByNameChanged', ($scope.searchByName));
	});
	$scope.$watch('searchByGroup', function()
	{
		$rootScope.$emit('searchByGroupChange', ($scope.searchByGroup));
	})

	$scope.$watch('filter', function()
	{
		$rootScope.$emit('orderByChange', ($scope.filter));
	})


});