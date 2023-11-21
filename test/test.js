const logger = require('../index');

logger.log('****************');
logger.log('*** Test log ***');
logger.log('****************');
logger.color('blue').underscore().log('blue and underscore.');
logger.color('blue').reverse().log('blue and reverse.');
logger.color('blue').dim().log('blue and dim.');
logger.color('blue').italic().log('blue and italic.');
logger.color('blue').strikethrough().log('blue and strikethrough.');
logger.color('red').bold().log('Red and Bold.');
logger.color('blue').bgColor('yellow').bold().italic().log('blue, yellow, bold, italic, ');
logger.log('this should be normal.')
logger.bold().italic().color('blue').bgColor('yellow').log('bold, italic, blue, yellow.');
// deprecated joint
logger.color('yellow').log('font in yellow,').joint().bgColor('red').log('background in red,');
logger.color('yellow').log('font in yellow,').joint()
      .bgColor('red').log('background in red,').joint()
      .color('yellow').log('font in yellow');
// test append
logger.color('yellow').append('font in yellow,').bgColor('red').log('background in red');
logger.color('yellow').append('font in yellow,')
      .bgColor('red').append('background in red,').reset()
      .color('yellow').log('font in yellow');
logger.log('\n');

logger.log('**************************');
logger.log('*** Test fontColorLog ****');
logger.log('**************************');
logger.fontColorLog('red', 'Font in red.');
logger.fontColorLog('black', 'Font in black.');
logger.fontColorLog('green', 'Font in green.');
logger.fontColorLog('yellow', 'Font in yellow.');
logger.fontColorLog('blue', 'Font in blue.');
logger.fontColorLog('magenta', 'Font in magenta.');
logger.fontColorLog('cyan', 'Font in cyan.');
logger.fontColorLog('white', 'Font in white.');
logger.fontColorLog('blue', 'Bold, blue, italic', {
    bold: true,
    underscore: false,
    italic: true
});
logger.fontColorLog('blue', 'Bold, dim, underscore, reverse', {
    bold: true,
    dim: true,
    underscore: true,
    reverse: true,
});
logger.fontColorLog('blue', 'Bold, underscore, blue.', {
    bold: true,
    dim: false,
    underscore: true,
    reverse: false,
});
logger.log('\n');

logger.log('************************');
logger.log('*** Test bgColorLog ****');
logger.log('************************');
logger.bgColorLog('red', 'Background in red.');
logger.bgColorLog('black', 'Background in black.');
logger.bgColorLog('green', 'Background in green.');
logger.bgColorLog('yellow', 'Background in yellow.');
logger.bgColorLog('blue', 'Background in blue.');
logger.bgColorLog('magenta', 'Background in magenta.');
logger.bgColorLog('cyan', 'Background in cyan.');
logger.bgColorLog('white', 'Background in white.');
logger.bgColorLog('blue', 'Bold, blue', {
    bold: true,
    underscore: false,
});
logger.bgColorLog('blue', 'Bold, dim, underscore, reverse', {
    bold: true,
    dim: true,
    underscore: true,
    reverse: true,
});
logger.bgColorLog('blue', 'Bold, underscore, blue.', {
    bold: true,
    dim: false,
    underscore: true,
    reverse: false,
});
logger.log('\n');

logger.log('*************************');
logger.log('***   Test colorLog  ****');
logger.log('*************************');
logger.colorLog({
    font: 'red',
    bg: 'black'
}, 'Red font in black background.');
logger.colorLog({
    font: 'blue',
    bg: 'yellow'
}, 'blue font in yellow background.');
logger.colorLog({
    font: 'red',
    bg: 'green'
}, 'Red font in green background.');
logger.colorLog({
    font: 'red',
    bg: 'green'
}, 'Red font in green background, underscore, strikethrough.', {
    underscore: true,
    reverse: false,
    strikethrough: true
});
logger.colorLog({
    font: 'red',
    bg: 'green'
}, 'Red font in green background, bold, underscore, reverse, strikethrough.', {
    bold: true,
    dim: false,
    underscore: true,
    reverse: true,
    strikethrough: true
});
logger.log('\n');

logger.log('**********************');
logger.log('*** Test Level Log ***');
logger.log('**********************');
logger.debug('This is debug mode');
logger.error('This is error mode');
logger.info('This is info mode');
logger.warn('This is warn mode');
logger.log('\n');

logger.log('*************************');
logger.log('*** Test Wrong Usage ****');
logger.log('*************************');
logger.fontColorLog('test', 'Should be no color.');
logger.bgColorLog('test', 'Should be no color.');
logger.colorLog({
    font: 'test',
    bg: 'blue'
}, 'Font color warning.');
logger.colorLog({
    font: 'red',
    bg: 'test'
}, 'Background color warning.');
logger.colorLog({
    font: 'test',
    bg: 'test'
}, 'Font and background color warning.');
logger.fontColorLog('red', 'Wrong setting.', {
    width: true,
});
logger.bgColorLog('red', 'Wrong setting.', {
    dim: 'true',
});
logger.bgColorLog('red', 'Wrong setting.', {
    bold: 4
});

logger.log('*************************');
logger.log('*** Test Level Usage ****');
logger.log('*************************');
logger.log('Set level to debug:');
logger.setLevel("debug");
logger.error('error show');
logger.warn('warn show');
logger.info('info show');
logger.debug('debug show');

logger.log('Set level to info:');
logger.setLevel("info");
logger.error('error show');
logger.warn('warn show');
logger.info('info show');
logger.debug('debug will not show');

logger.log('Set level to warn:');
logger.setLevel("warn");
logger.error('error show');
logger.warn('warn show');
logger.info('info will not show');
logger.debug('debug will not show');

logger.log('Set level to error:');
logger.setLevel("error");
logger.error('error show');
logger.warn('warn will not show');
logger.info('info will not show');
logger.debug('debug will not show');

logger.log('****************************');
logger.log('*** Test Level No Color ****');
logger.log('****************************');
logger.setLevelNoColor();
logger.setLevel("debug");
logger.error('error show');
logger.warn('warn show');
logger.info('info show');
logger.debug('debug show');

logger.log('*************************************');
logger.log('*** Test Level Multiple Arguments ***');
logger.log('*************************************');
logger.setLevelColor();
logger.error('error show', 'error show 2');
logger.warn('warn show', {a: 1, b: 2});
logger.info('info show', {a: [1, 2, 4]}, [4, 4, 4]);
logger.debug('debug show', [1, 2, 3]);

logger.log('*************************************');
logger.log('***      Test Date Format         ***');
logger.log('*************************************');
logger.setLevel("info");
logger.setDate(() => (new Date()).toLocaleTimeString())
logger.info("This is an info message") // 5:17:59 pm [INFO] This is an info message
