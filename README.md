![Banner](https://raw.githubusercontent.com/tigercosmos/node-color-log/master/assets/banner.png)

[![Build Status](https://travis-ci.org/tigercosmos/node-color-log.svg?branch=master)](https://travis-ci.org/tigercosmos/node-color-log)
[![npm version](https://badge.fury.io/js/node-color-log.svg)](https://badge.fury.io/js/node-color-log)
[![npm downloads](https://badgen.now.sh/npm/dm/node-color-log)](https://www.npmjs.com/package/node-color-log)

# Node Color Log

The more powerful JavaScript logger for NodeJS and browsers.

`node-color-log` is a logger package for NodeJS and browsers. It provides more functions than the origin `console.log`. You can log text with colorful font and colorful background. Also, it has 4 levels log, including `debug`, `info`, `warn`and `error`. Give you much better experience while developing JavaScript projects.

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

## API

### `log()`

log with attributes, the order of setters can change.

**NOTE:** `log()` need to put behind of attribute setter(at the end).

`joint()` can connect different style of message in a line.

`color()` and `bgColor()` includes: `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`.

Usage:

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

// log multiple arguments
logger.log(obj1, arr2, str3);
```

### `fontColorLog()`, `bgColorLog()`, `colorLog()`

- `message` here must be a string.

- Color includes: `black`, `red`, `green`, `yellow`, `blue`, `magenta`, `cyan`, `white`.

- `setting` is optional. Keys in `setting` need to be boolean, and all are `false` by default.

Parameters:

```javascript
const color = 'red';
const message = 'any string you will put into console.log';
const setting = {
    bold: true,
    dim: true,
    underscore: true,
    reverse: true,
    italic: true,
    strikethrough: true
}
```

Usage:

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

### `success()`, `debug()`, `info()`, `warn()`, `error()`

With prefix that has background color

Usage:

```javascript
// Success level, with prefix "[SUCCESS]"
logger.success(message);
// debug level, with prefix "[DEBUG]"
logger.debug(message);
// Info level, with prefix "[INFO]"
logger.info(message);
// Warn level, with prefix "[WARN]"
logger.warn(message);
// Error level, with prefix "[ERROR]"
logger.error(message);


// Level logs enable multiple arguments
logger.debug(obj1, arr2, str3);
```

The output looks like:

```log
2018-08-14T18:23:09.836Z [SUCCESS] This is success mode
2018-08-14T18:23:09.837Z [DEBUG] This is debug mode
2018-08-14T18:23:09.838Z [INFO] This is info mode
2018-08-14T18:23:09.838Z [WARN] This is warn mode
2018-08-14T18:23:09.839Z [ERROR] This is error mode
```

### `setLevel()` & `LOGGER` environment variable

If you want to set mask for levels, simply add the line at the front. Levels below the setting level will all be hidden. There are four levels, which are `success`, `debug`, `info`, `warn`, `error`, or `disable` in lower-case.

```js
logger.setLevel("info"); // success < debug < info < warn < error < disable
logger.debug("This `debug` will be hidden");

logger.setLevel("disable"); // hide every logs
logger.success("However, you can use `success` to break the disable, so this line will be shown.");
```

Or, you can set the environment variable `LOGGER`, such as `LOGGER=info npm start`, where it's equal to `setLevel("info")`.


### `setLevelNoColor()`, `setLevelColor()`

Level logs print in colors as a default.

You can set `setLevelNoColor()` to turn off the setting, and use `setLevelColor()` to reverse it.

None color mode is helpful for text files or browser environments.

```js
logger.setLevelNoColor();
```

### `setDate()`

The default time format is `toISOString`, but you can change it by using `setDate(callback)`

```
logger.setDate(() => (new Date()).toLocaleTimeString())
logger.info("This is an info message") // 5:17:59 pm [INFO] This is an info message
```

### Log Files

If you want to save the logs to files, you can use shell pipes:

For example, it saves logs belonged and above `warn` to `log.txt`:

```shell
$ LOGGER=warn node index.js > log.txt
```

To see more example, you can check `./test.js` or run `npm test` to see the result.

### Contribute

Any issues and PRs are very welcome!

### License

MIT
