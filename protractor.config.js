exports.config = {
  // seleniumAddress: 'http://localhost:4444/wd/hub',
  seleniumServerJar: './node_modules/protractor/selenium/selenium-server-standalone-2.44.0.jar',
  specs: ['tests/e2e/commentsSpec.js']
};
