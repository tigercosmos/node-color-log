![Banner](https://raw.githubusercontent.com/tigercosmos/node-color-log/master/assets/banner.png)
[![Build Status](https://travis-ci.org/tigercosmos/node-color-log.svg?branch=master)](https://travis-ci.org/tigercosmos/node-color-log)
[![CircleCI](https://circleci.com/gh/tigercosmos/node-color-log/tree/master.svg?style=shield)](https://circleci.com/gh/tigercosmos/node-color-log/tree/master)
[![npm version](https://badge.fury.io/js/node-color-log.svg)](https://badge.fury.io/js/node-color-log)
# Node Color Log
The more powerful logger for NodeJS.

`node-color-log` is a package for NodeJS. It provides more functions than the origin `console.log`. You can log text with colorful font and colorful background. Also, it has four levels log, including `debug`, `info`, `warn`and `error`. Give you much better experience while developing NodeJS projects.

## Demo

<img alt="Demo" src="https://raw.githubusercontent.com/tigercosmos/node-color-log/master/assets/demo-log.png" width="500">

<img alt="Demo" src="https://raw.githubusercontent.com/tigercosmos/node-color-log/master/assets/demo.JPG" width="500">

## Usage
Install package in your project:
```
npm install node-color-log --save
```

Put the following code in your `js` in which you want to log.
```javascript

const Logger = require('node-color-log');
const logger = new Logger();

// color can be used in anywhere need to fill color name.
// including: 'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'
let color = '';
let message = 'anything you will put into console.log';
// optional parameter, need to be boolean. false by defualt.
const setting = {
    bold: true,
    dim: true,
    underscore: true,
    reverse: true,
    italic: true,
    strikethrough: true
}

// normal log
logger.log(message)
// log with attributes, the order of setters can change.
// NOTE: log() need tot put at the last.
logger.color('red').bgColor('blue')
      .bold().italic().dim().reverse().underscore().strikethrough()
      .log(message);

// only set font color
logger.fontColorLog('red', message, setting);
// only set background color
logger.bgColorLog('yellow', message, setting);
// set font and background color
logger.colorLog({
    font: 'black',
    bg: 'yellow'
}, message, setting);


// debug level, with prefix "DEBUG: "
logger.debug(message);
// Error level, with prefix "ERROR: "
logger.error(message);
// Info level, with prefix "INFO: "
logger.info(message);
// Warn level, with prefix "WARN: "
logger.warn(message);
```

To see more example, you can check `./test.js`.

### Contribute
Any issues and PRs are very welcome!

### Lisense
MIT
