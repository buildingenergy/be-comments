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
                email: 'jd@me.com'
            },
            {
                text: 'Hello Jane',
                name: 'Bob Doe',
                email: 'bd@me.com'
            },
        ];
        $rootScope.user = {
            name: 'Bob Dow',
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
    });

    // it('holds the table state in the models attrible', function() {
    //     // arrange
    //     var element = $compile('<be-table rows="rows" columns="columns" models="models"></be-table>')($rootScope);
    //     // act
    //     $rootScope.$digest();
    //     // assert
    //     expect($rootScope.models).not.toBe(undefined);
    //     expect($rootScope.models.filter_params).toEqual({});
    //     expect($rootScope.models.selected_rows.checked).toEqual([]);
    // });

    // it('should display floor_area types with commas and ft²', function() {
    //     // arrange
    //     var element = $compile('<be-table rows="rows" columns="columns" models="models"></be-table>')($rootScope);
    //     // act
    //     $rootScope.$digest();
    //     // assert
    //     expect(element.html()).toContain("1,235,345 ft²");
    // });

    // it('should display string types as strings', function() {
    //     // arrange
    //     var element = $compile('<be-table rows="rows" columns="columns" models="models"></be-table>')($rootScope);
    //     // act
    //     $rootScope.$digest();
    //     // assert
    //     expect(element.html()).toContain("7795"); // not 7,795
    // });

    // it('should display checkbox types', function() {
    //     // arrange
    //     var element = $compile('<be-table rows="rows" columns="columns" models="models"></be-table>')($rootScope);
    //     // act
    //     $rootScope.$digest();
    //     // assert
    //     expect(element.html()).toContain('<input type="checkbox" ng-model="controls.select_all_checkbox[c.model_name]" ng-change="select_all_rows(c.model_name)"');
    // });

});
