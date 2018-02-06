![Banner](https://raw.githubusercontent.com/tigercosmos/node-color-log/master/assets/banner.png)
[![Build Status](https://travis-ci.org/tigercosmos/node-color-log.svg?branch=master)](https://travis-ci.org/tigercosmos/node-color-log)
[![CircleCI](https://circleci.com/gh/tigercosmos/node-color-log/tree/master.svg?style=shield)](https://circleci.com/gh/tigercosmos/node-color-log/tree/master)
[![npm version](https://badge.fury.io/js/node-color-log.svg)](https://badge.fury.io/js/node-color-log)
# Node Color Log
The more powerful logger for NodeJS.

`node-color-log` is a package for NodeJS. It provides more functions than the origin `console.log`. You can log text with colorful font and colorful background. Also, it has four levels log, including `debug`, `info`, `warn`and `error`. Give you much better experience while developing NodeJS projects.

## Demo

<img alt="Demo" src="https://raw.githubusercontent.com/tigercosmos/node-color-log/master/assets/demo-log.png" width="800">

<img alt="Demo" src="https://raw.githubusercontent.com/tigercosmos/node-color-log/master/assets/demo-color.png" width="800">

<img alt="Demo" src="https://raw.githubusercontent.com/tigercosmos/node-color-log/master/assets/demo-level.png" width="800">

## Usage

### Install

Install package in your project:

```bash
npm install node-color-log@latest --save
```

### Import

Put the following code in your `js` in which you want to log.

```javascript
const logger = require('node-color-log');
```

### Some parameters:

- `color` includes: `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`.

- `setting` is optional, which is only used in `colorLog`, `fontColorLog` and `bgColorlog`. Keys in `setting` need to be boolean, and false by defualt.

```javascript
let color = 'red';
let message = 'anything you will put into console.log';
const setting = {
    bold: true,
    dim: true,
    underscore: true,
    reverse: true,
    italic: true,
    strikethrough: true
}
```

### `log()`

log with attributes, the order of setters can change.

**NOTE:** `log()` need to put behind of attribute setter(at the end).

`joint()` can connect different style of message in a line.

```javascript
// normal log
logger.log(message)
// Attribute log
logger.color('red').bgColor('blue')
      .bold().italic().dim().reverse().underscore().strikethrough()
      .log(message);
// Joint log
logger.color('red').bold().log(message_style_1).joint()
      .bgColor('white').italic().log(message_style_2).joint()
      .strikethrough().log(message_style_3);
```

### `fontColorLog()`, `bgColorLog()`, `colorLog()`

```javascript
// only set font color
logger.fontColorLog('red', message, setting);
// only set background color
logger.bgColorLog('yellow', message, setting);
// set font and background color
logger.colorLog({
    font: 'black',
    bg: 'yellow'
}, message, setting);
```

### `debug()`, `error()`, `info()`, `warn()`

With prefix that has background color

```javascript
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
