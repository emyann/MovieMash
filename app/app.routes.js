(function(){

angular
	.module("movieMash")
	.config(config);

	config.$inject=['$stateProvider','$urlRouterProvider','localStorageServiceProvider'];
	function config($stateProvider, $urlRouterProvider,localStorageServiceProvider) {
	    $stateProvider
		    .state('home', {
		      url: "/home",
		      views: {
		      	'':{ templateUrl: "layout/moviemash.layout.html" },
		        "playground@home": { 
					templateUrl: "movie/movies.list.html",
					controller:'MovieController',
					controllerAs:'movieCtlr' },
		        "scores@home": { 
		        	templateUrl: "score/score.html",
		        	controller:'ScoreController',
		        	controllerAs:'scoreCtlr' }
		      }
    		})
    		.state('about', {
		      url: "/about",
		      template:"Bienvenue sur le site MovieMash"
    		})
    		.state('home.play',{
    			url:"/play",
    			views:{
    				'playground@home':{
    					templateUrl:"game/movies.game.html",
    					controller:'GameController',
						controllerAs:'gameCtlr'	
    				}
    			}
    		});


    	$urlRouterProvider.otherwise('/home');

    	localStorageServiceProvider
    		 .setPrefix('movieMash');
    	

	}

})();