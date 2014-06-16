'use strict';

var assert = require('assert');
var pf = require('../');
var packages = require('cortex-playground').packages;
var cortex_json = require('read-cortex-json');
var fss = require('fs-sync');
var node_path = require('path');

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
      assert.ok(exists('.cortexignore', files), 'should include dot file');
      assert.ok(noexists('style.css', files), 'should not include style.css');
      assert.ok(noexists('unnecessary.js', files), 'should not include unnecessary.js');
      assert.ok(noexists('src/a.swf', files), 'should not include src/a.swf');
      assert.ok(exists('README.md', files), 'should always include README.md');
      assert.ok(exists('cortex.json', files), 'should always include cortex.json');
      assert.ok(noexists('package.json', files), 'not always include package.json');
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
    
    var node_module_files = [
      'node_modules/package.json',
      'node_modules/cortex.json',
      'node_modules/a/c/d/f/README.md'
    ];

    function write (path) {
      var file = node_path.join(dir, path);
      fss.write(file, '');
    }

    // #1
    node_module_files.forEach(write);

    write('xxxxx.xxx');
    write('xxxxx/xxxxx.xxx');

    pf({
      cwd: dir,
      pkg: json,
      more: true,
      ignore: '/xxxxx.xxx'

    }, function (err, files) { console.log('p2 files', files)
      node_module_files.forEach(function (file) {
        assert.ok(noexists(file, files), 'should exclude node_modules');
      });

      assert.ok(noexists('xxxxx.xxx', files), 'should not include xxxxx.json');
      assert.ok(exists('xxxxx/xxxxx.xxx', files), 'should include xxxxx/xxxxx.json');

      assert.equal(err, null, 'fail to get cortex files');
      assert.ok(exists('.cortexignore', files), 'should include dot file');
      // has no pkg.css
      assert.ok(exists('style.css', files), 'should include style.css');
      assert.ok(noexists('unnecessary.js', files), 'should not include unnecessary.js');

      // has no pkg.directories
      assert.ok(exists('src/a.swf', files), 'should include src/a.swf');
    });
  });
});
