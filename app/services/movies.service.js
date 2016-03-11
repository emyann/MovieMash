(function(){
	angular
		.module('movieMash')
		.factory('movieService',movieService);

		movieService.$inject=['$http','$log','$q','IMDB_URL'];

		function movieService($http,$log,$q,IMDB_URL){
			var api_baseUrl=IMDB_URL;
			var api_key='9f36e8ba089e4e963fe0528fb83014f9';

			var service={
				getTopRatedMovies:getTopRatedMovies
			};
			return service;

			function getTopRatedMovies(){
				var request='/discover/movie?certification=R&api_key='+
                                api_key+
                                    '&page=1&language=fr&include_image_language=fr&sort_by=vote_average.desc&vote_count.gte=1000';
				return $http.get(api_baseUrl+request);
			}
		}

})();