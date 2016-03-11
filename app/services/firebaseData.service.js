(function() {
'use strict';

    angular
        .module('movieMash')
        .factory('firebaseDataService', FirebaseDataService);

    FirebaseDataService.$inject = ['FIREBASE_URL'];
    function FirebaseDataService(FIREBASE_URL) {
        var root = new Firebase(FIREBASE_URL);

        var service = {
             root: root,
             scores: root.child('data')
        };
        
        return service;
    }
})();