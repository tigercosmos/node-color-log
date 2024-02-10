11.0.2
- check `process.env` exists

11.0.1
- fixed `Stream` typescript

11.0.0
- add `append()` and deprecate `joint`, add `reset`, add `setLogStream` to redirect logs to the stream

10.0.2
- fix typescript namespace issues

10.0.1
- update document for `createNamedLogger()`

10.0.0
- Adding error catching to json stringify
- Adding support for named loggers: `createNamedLogger()`

9.0.0
- modify `success()`

8.0.1
- revise README

8.0.0
- add success option
- increase label contrast

7.0.0
- fix TypeScript types

6.0.0
- add `setDate` and `getDate`

5.3.1
- fix typescript declaration

5.3.0
- support `disable` for levels

5.2.0
- support TypeScript (may require `--esModuleInterop` flag)

5.1.0
- fix none color mode not pure text

5.0.0
- log(), debug(), info(), warn(), error(): support for multiple arguments
- add setLevelNoColor(), setLevelColor()

4.0.0
- add LOGGER environment variable as level setter

3.0.3
- update readme

3.0.2
- update readme

3.0.1
- update CI & add npmignore

3.0.0
- change log level order

2.2.0
- add setLevel

2.1.2
- update README and demo image

2.1.0
- add time for level log.
  e.g. 2018-08-04T15:58:56.186Z [WARN] XXXXX

2.0.2
- banner modified.

2.0.0
- `module.exports` from class type to function.

1.1.1
- add new demo image

1.1.0
- add `joint`
- update `debug()`, `error()`, `info()`, `warn()`

1.0.2
- update demo image

1.0.1
- update demo image
- update readme

1.0.0
- `log` add attribute setter `color`, `bgColor`, `bold`, `italic`, `dim`, `reverse`, `undserscore`, `strikethrough`
- `fontColor` rename `fontColorLog`
- `bgColor` rename `bgColorLog`
- `setColor` rename `setColorLog`

0.0.3
- Add the third parameter `setting` for `fontColor`, `bgColor`, `setColor`

0.0.2
- Implement `fontColor`, `bgColor`, `setColor` and other functions
