'use strict';

var assert = require('assert');
var pf = require('../');
var packages = require('cortex-playground').packages;
var cortex_json = require('read-cortex-json');
var fss = require('fs-sync');

function exists (path, files) {
  return !!~files.indexOf(path);
}

function noexists (path, files) {
  return !~files.indexOf(path);
}

var p = packages('normal');

p.copy(function (err, dir) {
  if (err) {
    console.error('skip testing due to errors', err);
    return;
  }
  cortex_json.read(dir, function (err, json) {
    assert.equal(err, null, 'fail to read cortex.json');
    pf({
      cwd: dir,
      pkg: json
    }, function (err, files) { console.log('p files', files)
      assert.equal(err, null, 'fail to get cortex files');
      assert.ok(exists('.gitignore', files), 'should include dot file');
      assert.ok(noexists('style.css', files), 'should not include style.css');
      assert.ok(noexists('unnecessary.js', files), 'should not include unnecessary.js');
      assert.ok(noexists('src/a.swf', files), 'should not include src/a.swf');
      assert.ok(exists('README.md', files), 'should always include README.md');
      assert.ok(exists('cortex.json', files), 'should always include cortex.json');
      assert.ok(exists('package.json', files), 'should always include package.json');
    });
  });
});

var p2 = packages('normal');

p2.copy(function (err, dir) {
  if (err) {
    console.error('skip testing due to errors', err);
    return;
  }
  cortex_json.read(dir, function (err, json) {
    assert.equal(err, null, 'fail to read cortex.json');
    pf({
      cwd: dir,
      pkg: json,
      more: true
    }, function (err, files) { console.log('p2 files', files)
      assert.equal(err, null, 'fail to get cortex files');
      assert.ok(exists('.gitignore', files), 'should include dot file');
      // has no pkg.css
      assert.ok(exists('style.css', files), 'should include style.css');
      assert.ok(noexists('unnecessary.js', files), 'should not include unnecessary.js');

      // has no pkg.directories
      assert.ok(exists('src/a.swf', files), 'should include src/a.swf');
    });
  });
});
