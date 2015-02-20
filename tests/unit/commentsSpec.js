var app = angular.module('app', ['be.comments']);

describe("The be-comments directive", function() {
    var $compile;
    var $rootScope;
    beforeEach(module('app'));
    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function(_$compile_, _$rootScope_, $templateCache){
      // The injector unwraps the underscores (_) from around the parameter names when matching
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $rootScope.feed = {};
        $rootScope.feed.comments = [
            {
                text: 'Hello Bob',
                name: 'Jane Doe',
                email: 'jd@me.com',
                datetime: '2012-02-02T11:33:33'
            },
            {
                text: 'Hello Jane',
                name: 'Bob Doe',
                email: 'bd@me.com',
                datetime: '2012-02-02T23:35:33'
            },
        ];
        $rootScope.user = {
            name: 'Bob Doe',
            email: 'bd@me.com'
        };
        $rootScope.callbackHit = false;
        $rootScope.logComment = function (comment) {
            $rootScope.callbackHit = true;
            $rootScope.comment = comment;
        };

    }));

    it('Replaces the element with the appropriate content', function() {
        // Compile a piece of HTML containing the directive
        var element = $compile('<comments comments-data="feed.comments" email="user.email", name="user.name" callback="logComment(comment)"></be-table>')($rootScope);
        // fire all the watches
        $rootScope.$digest();
        // Check that the compiled element contains the templated content
        expect(element.html()).toContain("comment_container");
        expect(element.html()).toContain("comment_input");
        expect(element.html()).toContain("JD");
        expect(element.html()).toContain("Hello Bob");
        expect(element.html()).toContain("Hello Jane");
        expect(element.html()).toContain("2/2/12");
        expect(element.html()).toContain("11:33 AM");
        expect(element.html()).toContain("11:35 PM");
    });

});
