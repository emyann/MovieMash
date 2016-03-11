(function(){
	angular
		.module("movieMash")
		.controller("GameController",GameController);

		GameController.$inject=['movieService','scoreService','$state'];

		function GameController(movieService,scoreService,$state){
			var vm = this;
			vm.movies=[];
			vm.step = 0;
			vm.movie1={};
			vm.movie2={};

			movieService.getTopRatedMovies()
				.then(function(response) {
				   	var movies = response.data.results;
					vm.movies = movies;
					vm.prepareOpponents();
				  },
				  function(error) {
				   	$log.error(error);
				  });

			vm.prepareOpponents = function(){
                var maxRange = vm.movies.length;
				var idMovie1=Math.floor((Math.random() * maxRange));
				var idMovie2= Math.floor((Math.random() * maxRange));
				while(idMovie2 == idMovie1){
					idMovie1=Math.floor((Math.random() * maxRange));
					idMovie2= Math.floor((Math.random() * maxRange));
				}
				vm.movie1= vm.movies[idMovie1];
				vm.movie2= vm.movies[idMovie2];
				vm.step ++;
			};

			vm.addPointToMovie=function(movie){
				scoreService.addPointToMovie(movie);
				if(vm.step < 10){
					vm.prepareOpponents();
				}else{
					$state.go('home');
				}
				
			}

		}

})();
