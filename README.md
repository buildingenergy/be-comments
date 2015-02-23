## AngularJS Bootstrap Comments

easy to use directive and css for a nice comment block
(jquery free except for testing)

![comments](/images/comments.png?raw=true)


### demo

http://buildingenergy.github.io/be-comments/


### quick start

```console
$ bower install be-comments
````

requires (see [bower.json](bower.json)): AngularJS, font-awesome, lodash, bootstrap css

include `comments.min.js`, `comments.css` in your HTML

```html
<!-- these should be somewhere -->
<link href="bower_components/fontawesome/css/font-awesome.css" rel="stylesheet" type="text/css" />
<link href="bower_components/bootstrap/dist/css/bootstrap.css"  rel="stylesheet" type="text/css" />
<script src="bower_components/angularjs/angular.js"></script>
<script src="bower_components/lodash/lodash.min.js"></script>

...

<script src="bower_components/be-comments/build/js/comments.min.js"></script>
<link href="bower_components/be-comments/build/css/comments.css" rel="stylesheet" type="text/css" />
```

and in your angular module

```js
var app = angular.module('app', ['be.comments']);
```

### usage

#### HTML

```html
<comments comments-data="feed.comments"
          email="user.email"
          name="user.name"
          callback="logComment(comment)"></comments>
```

#### JS

```js
angular.controller('myController', []).controller('myController', ['$scope', function ($scope) {
    ...
    $scope.feed = {
        comments: [{
            text: "This looks good, let's send it over the wall...",
            name: "Mike Smith",
            email: "ms@me.com"
            // coming soon datetime stamps
        }]
    };
    $scope.user = {
        name: "Bob Jones",
        email: "bob.jones@mhof.com"
    };
    /**
     * comments callback logger
     * @param {obj} comment
     */
    $scope.logComment = function (comment) {
        console.log(comment): // {text: "entered comment text", name: "John Rocks", email: "gnar@crushing.it"}
    };

}]);
```


### develop

```console
npm install -g gulp
npm install -g bower
npm install -g karma-cli
npm install
gulp  # this will build and open a browser which you can navigate to demo/index.html
```

#### test

e2e

```console
gulp e2e
```

unit

```console
gulp karma
```

### license

see [LICENSE](LICENSE)

#### release

1. Update the `build` js and css by:

  ```console
  gulp build
  ```

2. Commit the updates

3. Add a semver tag for the release


### todos

- ~~figure out why two gulp builds are needed to get htmlMinify included~~
- fix min map
- ~~selenium tests~~
- ~~unit tests~~
