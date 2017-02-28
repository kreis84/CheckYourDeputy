angular.module('cyd')

.factory('getDeputyList', function($http, $q){
	var list = [];
	var timesToLoad = 0;
	var chunkLength = 0;
	var promise = '';

	promise = $q(function(resolve, reject)
	{
		$http.get('https://api-v3.mojepanstwo.pl/dane/poslowie.json?conditions[poslowie.kadencja]=8')
		.then(function(response)
		{
			chunkLength = response.data.Dataobject.length;
			timesToLoad = Math.ceil(parseInt(response.data.Count) / chunkLength);
			for(var i=1; i<=timesToLoad; i++)
			{
				$http.get('https://api-v3.mojepanstwo.pl/dane/poslowie.json?conditions%5Bposlowie.kadencja%5D=8&_type=objects&page='+i)
				.then(function(response)
				{
					for(var item of response.data.Dataobject)
						{
							list.push({name: item.data['ludzie.nazwa'], id: parseInt(item.id), group: item.data['sejm_kluby.nazwa']});
						};
					if(list.length >= chunkLength*(timesToLoad-1))
					{
						list=list.filter((item)=> { if( !isNaN(item.id) && (item.name !=='')) return item; });	
						resolve(list);	
					}
				},
				function()
				{
					reject('error in getDeputyListFactory');
				});
			};
		})
	});
	return promise;
})

.factory('particularDeputy', function($http)
{
	return	{
		get: function(id)
		{	
			return $http.get('https://api-v3.mojepanstwo.pl/dane/poslowie/'+id+'.json?layers[]=krs&layers[]=wydatki&layers[]=biura&layers[]=wyjazdy');
		}
	};
});

