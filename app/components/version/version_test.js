'use strict';

describe('hereComesTheSun.version module', function() {
  beforeEach(module('hereComesTheSun.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
