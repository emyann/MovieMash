(function(){
	angular
		.module("movieMash")
		.controller("ScoreController",ScoreController);

		ScoreController.$inject=['scoreService'];

		function ScoreController(scoreService){
			var vm = this;
			vm.scores=[];

			vm.scores = scoreService.getAllScores();
		}
})();