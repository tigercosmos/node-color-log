![Banner](https://raw.githubusercontent.com/tigercosmos/node-color-log/master/assets/banner.png)
[![Build Status](https://travis-ci.org/tigercosmos/node-color-log.svg?branch=master)](https://travis-ci.org/tigercosmos/node-color-log)
[![npm version](https://badge.fury.io/js/node-color-log.svg)](https://badge.fury.io/js/node-color-log)
# Node Color Log
The more powerful logger for NodeJS.

`node-color-log` is a package for NodeJS. It provides more functions than the origin `console.log`. You can log text with colorful font and colorful background. Also, it has four levels log, including `debug`, `info`, `warn`and `error`. Give you much better experience while developing NodeJS projects.

## Demo

<img alt="Demo" src="https://raw.githubusercontent.com/tigercosmos/node-color-log/master/assets/demo.JPG" width="500">

## Usage
```javascript
const Logger = require('node-color-log');
const logger = new Logger();

// Both font and background color including:
// 'black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'

// normal
logger.log(message)
// set font color
logger.fontColor('red', message);
// set background color
logger.bgColor('yellow', message);
// set font and background color
logger.setColor({
    font: 'black',
    bg: 'yellow'
}, message);

// Degug level, with prefix "DEBUG: "
logger.degug(message);
// Error level, with prefix "ERROR: "
logger.error(message);
// Info level, with prefix "INFO: "
logger.info(message);
// Warn level, with prefix "WARN: "
logger.warn(message);
```

### Lisense
MIT
