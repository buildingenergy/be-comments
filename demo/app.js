angular.module('app', ['be.comments'])
.controller('beCtrl', ['$scope', '$log', function ($scope, $log) {
    $scope.user = {
        name: 'John S',
        email: 'js@me.com'
    };
    $scope.feed = {
        comments: [
            {text: 'Great job!', name: 'Aleck Landgraf', email: 'al@me.com'},
            {text: 'Thanks Aleck!', name: 'John S', email: 'js@me.com'}
        ]
    };
    $scope.logComment = function (comment) {
        $log.info(comment);
    };
}]);
