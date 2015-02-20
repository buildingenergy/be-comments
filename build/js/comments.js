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
.service('commentsService', ["$timeout", function($timeout){
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
    $scope.$element1 = self.$element;
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

angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("comments.html","<div class=\"section_content_container\"><div class=\"section_content with_padding with_top_padding\"><div class=\"comment_section_container\"><div class=\"comment_section_title\"><ng-pluralize count=\"commentsData.length\" when=\"{\'0\': \'Comments\', \'1\': \'1 Comment\', \'other\': \'{} Comments\'}\"></ng-pluralize></div><div class=\"comment_container\"><table ng-class=\"{contacts_comment: c.email !== email, user_comment: c.email === email}\" ng-repeat=\"c in commentsData\"><tbody><tr><td colspan=\"2\" class=\"time_stamp\" ng-hide=\"true\">thu 2:08 pm</td></tr><tr><td><div ng-if=\"c.email !== email\">{{ c.name | initials }}</div></td><td><div class=\"comment\">{{ c.text }}</div></td><td></td></tr></tbody></table></div><div class=\"comment_input\"><form ng-submit=\"submitAComment()\"><div class=\"form-group\"><div class=\"input-group\"><input name=\"commentText\" type=\"text\" class=\"form-control\" id=\"commentText\" placeholder=\"Write a comment...\" ng-model=\"commentText\"> <a class=\"input-group-addon\" ng-click=\"submitAComment()\"><i class=\"fa fa-comment-o\" ng-if=\"commentText.length == 0 || !commentText\"></i><i class=\"fa fa-comment\" ng-if=\"commentText.length > 0\"></i></a></div></div></form></div></div></div></div>");}]);