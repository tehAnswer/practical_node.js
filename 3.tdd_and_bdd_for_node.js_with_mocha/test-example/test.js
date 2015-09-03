var assert = require('assert');
describe('String#split', function () {
  it('should return an array', function () {
    assert(Array.isArray('a,b,c'.split(',')));
  });

  it('should return the same array', function() {
    var splited = 'a,b,c'.split(',');
    var expected = ['a', 'b', 'c'];
    assert.equal(expected.length, splited.length, 'arrays have equal length');
    for (var i = 0; i < expected.length; i++) {
      assert.equal(expected[i], splited[i], i + ' element is equal');
    }
  });
});