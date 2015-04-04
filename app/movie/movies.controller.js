(function(){
	angular
		.module("movieMash")
		.controller("MovieController",MovieController);

		MovieController.$inject=['movieService','$log'];

		function MovieController(movieService,$log){
			var vm = this;
			vm.movies=[];
			
			movieService.getTopRatedMovies()
				.then(function(response) {
				   	var movies = response.data.results;
					vm.movies = movies;
				  },
				  function(error) {
				   	$log.error(error);
				  });

		}
})();