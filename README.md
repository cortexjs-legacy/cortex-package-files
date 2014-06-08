# cortex-package-files [![NPM version](https://badge.fury.io/js/cortex-package-files.svg)](http://badge.fury.io/js/cortex-package-files) [![Build Status](https://travis-ci.org/cortexjs/cortex-package-files.svg?branch=master)](https://travis-ci.org/cortexjs/cortex-package-files) [![Dependency Status](https://gemnasium.com/cortexjs/cortex-package-files.svg)](https://gemnasium.com/cortexjs/cortex-package-files)

Get all files that cortex needs inside a repo.

## Install

```bash
$ npm install cortex-package-files --save
```

## Usage

```js
var files = require('cortex-package-files');
```

### files(options, callback)

- options `Object`
  - cwd `path`
  - pkg `Object` package object
  - more `Boolean=false` if `true`, it will include more files according to `pkg.directories` and `pkg.css`
- callback `function(err, files)`
- err `Error`
- files `Array.<path>` array of path

## License

MIT
<!-- do not want to make nodeinit to complicated, you can edit this whenever you want. -->