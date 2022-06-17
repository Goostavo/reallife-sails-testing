/**
 * Testing boostraping
 *
 * @description :: Lifts the sails server for testing
 */
var Sails = require('sails');

// Global before hook
before(function (done) {
  this.timeout(120000); //Long timeout. Sails lifting on first time can be slow
  // Lift Sails with test database
  Sails.lift(
    {
      log: {
        level: 'error',
      },
    },
    (err) => {
      if (err) {
        return done(err);
      } else {
        return done();
      }
    }
  );
});

// Global after hook
after((done) => {
  // console.log('Lowering Sails');
  Sails.lower(done);
});
