/**
 * :copyright: (c) 2015 Building Energy Inc
 * :license: see LICENSE for more details.
 */
angular.module('comments', [])
.filter('initials', function () {
  return function (name) {
      var initials = "";
      var words = _.words(name);
      if (words.length) {
          initials = _.map(_.map(_.words(name), _.capitalize), _.first).join("");
      }
      return initials;
  };
})
.service('commentsService', ['$timeout', function($timeout){
  /**
   * scrolls the element div to bottom
   */
  this.scrollToBottom = function ( element ) {
    $timeout(function () {
      element.scrollTop = element.scrollHeight;
    }, 100);
  };
}])
.controller('commentsController', ['$scope', 'commentsService', function($scope, commentsService){
  var self = this,
      scope = $scope;

  /**
   * sets the element for the controller
   * @param  {obj} element DOM element
   */
  this.init = function ( element ) {
    self.$element = element[0].getElementsByClassName('comment_container')[0];
    commentsService.scrollToBottom(self.$element);
  };
  scope.submitAComment = function () {
    if ($scope.commentText === "" || $scope.commentText === undefined) {
      return;
    }
    var comment = {
      text: $scope.commentText,
      email: $scope.email
    };
    if ($scope.name) {
      comment.name = $scope.name;
    }
    $scope.callback({comment: comment});
    $scope.commentsData.push(comment);
    $scope.commentText = "";
    commentsService.scrollToBottom(self.$element);
  };
  scope.$watch('commentsData', function () {
    commentsService.scrollToBottom(self.$element);
  });

}])
.directive('comments', function () {
  return {
    restrict: 'E',
    scope: {
      commentsData: '=',
      callback: '&',
      email: '=',
      name: '=?'
    },
    controller: 'commentsController',
    link: function (scope, element, attrs, commentsCtrl) {
      commentsCtrl.init( element );
    },
    templateUrl: 'comments.html'
  };
});
