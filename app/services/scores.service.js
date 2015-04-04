(function(){
	angular
		.module("movieMash")
		.factory("scoreService",scoreService);

		scoreService.$inject=['localStorageService','$firebase'];

		function scoreService(localStorageService,$firebase){
			var firebase_url="https://moviemash.firebaseio.com/data";
			var scoreSetDb = new Firebase(firebase_url);
			var service={
				getAllScores:getAllScores,
				addPointToMovie:addPointToMovie,
				removePointToMovie:removePointToMovie
			};
			return service;

			function getAllScores(){

				 var ref = new Firebase(firebase_url);
				  var sync = $firebase(ref);
				  // create a synchronized array for use in our HTML code
				  return sync.$asArray();

/*				var keys = localStorageService.keys();
				var scores=[];
				angular.forEach(keys, function(key, index) {
				 scores.push(localStorageService.get(key));
				});
				return scores;*/

			}

			function addPointToMovie(movie){
				//var points = localStorageService.get(movie.id) ? localStorageService.get(movie.id).points : 0;
				//points ++;
				//localStorageService.set(movie.id,{movie:movie,points:points});*/
				 scoreSetDb.child(movie.id).once('value', function(snapshot) {
			        var exists = (snapshot.val() !== null);
			        if(exists){
			        	var points = snapshot.val().points;
						points++;
						var movieRef=scoreSetDb.child(movie.id);
						movieRef.update({points:points});
			        }else{
			        	var movieRef=scoreSetDb.child(movie.id);
			        	movieRef.set({movie:movie,points:1});
			        }
			        
			      });
				
				
			}

			function removePointToMovie(movie){
				var points = localStorageService.get(movie.id) ? localStorageService.get(movie.id).points : 0;
				points --;
				localStorageService.set(movie.id,{movie:movie,points:points});
			}
		}

})();