describe('angularjs homepage todo list', function() {
  it('should add a todo by click', function() {
    browser.get('http://localhost:8204/demo/index.html');

    element(by.model('commentText')).sendKeys('write a protractor test');
    element(by.css('a.input-group-addon')).click();

    var commentsList = element.all(by.repeater('c in commentsData'));
    expect(commentsList.count()).toEqual(3);
    expect(element(by.model('commentText')).getText()).toBe("");
  });
  it('should add a todo by enter', function() {
    browser.get('http://localhost:8204/demo/index.html');

    element(by.model('commentText')).sendKeys('write a protractor test',  protractor.Key.ENTER);


    var commentsList = element.all(by.repeater('c in commentsData'));
    expect(commentsList.count()).toEqual(3);
  });
});
