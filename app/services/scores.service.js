(function(){
	angular
		.module("movieMash")
		.factory("scoreService",scoreService);

		scoreService.$inject=['localStorageService','$firebaseArray','firebaseDataService'];

		function scoreService(localStorageService,$firebaseArray,firebaseDataService){
			var scoresSyncArray = $firebaseArray(firebaseDataService.scores);
			var service={
				getAllScores:getAllScores,
				addPointToMovie:addPointToMovie,
				removePointToMovie:removePointToMovie
			};
			return service;

			function getAllScores(){
				return scoresSyncArray;
			}

			function addPointToMovie(movie){
                var movieObj = scoresSyncArray.$getRecord(movie.id);
                if(movieObj){                    
                   movieObj.points ++;
                    scoresSyncArray.$save({movieObj});
                }else{
                    scoresSyncArray.$ref().child(movie.id).set({
                        movie:movie,
                        points:1
                    });
                }
            }

			function removePointToMovie(movie){
				var points = localStorageService.get(movie.id) ? localStorageService.get(movie.id).points : 0;
				points --;
				localStorageService.set(movie.id,{movie:movie,points:points});
			}
		}

})();