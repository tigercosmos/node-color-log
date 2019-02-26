![Banner](https://raw.githubusercontent.com/tigercosmos/node-color-log/master/assets/banner.png)

[![Build Status](https://travis-ci.org/tigercosmos/node-color-log.svg?branch=master)](https://travis-ci.org/tigercosmos/node-color-log)
[![CircleCI](https://circleci.com/gh/tigercosmos/node-color-log/tree/master.svg?style=shield)](https://circleci.com/gh/tigercosmos/node-color-log/tree/master)
[![npm version](https://badge.fury.io/js/node-color-log.svg)](https://badge.fury.io/js/node-color-log)
[![Greenkeeper badge](https://badges.greenkeeper.io/tigercosmos/node-color-log.svg)](https://greenkeeper.io/)

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

Logger level can be set like this. Logs belongs to this level and above that level will be printed.

```javascript
logger.setLevel("error"); // it can be any log level.
```  

### Some parameters:

- `color` includes: `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`.

- `setting` is optional, which is only used in `colorLog`, `fontColorLog` and `bgColorlog`. Keys in `setting` need to be boolean, and false by default.

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

```log
2018-08-14T18:23:09.837Z [DEBUG] This is debug mode
2018-08-14T18:23:09.837Z [ERROR] This is error mode
2018-08-14T18:23:09.838Z [INFO] This is info mode
2018-08-14T18:23:09.838Z [WARN] This is warn mode
```

### setLevel()

If you want to set mask for levels, simply add the line at the front. Levels below the setting level will all be hidden.

```js
logger.setLevel("debug"); // info < debug < warn < error
logger.info("This `info` will be hidden");
```

To see more example, you can check `./test.js` or run `npm test` to see the result.

### Contribute

Any issues and PRs are very welcome!

### License

MIT
