const Logger = require('./index');
const logger = new Logger();

logger.log('************************');
logger.log('*** Test Font Color ****');
logger.log('************************');
logger.fontColor('red', 'Font in red.');
logger.fontColor('black', 'Font in black.');
logger.fontColor('green', 'Font in green.');
logger.fontColor('yellow', 'Font in yellow.');
logger.fontColor('blue', 'Font in blue.');
logger.fontColor('magenta', 'Font in magenta.');
logger.fontColor('cyan', 'Font in cyan.');
logger.fontColor('white', 'Font in white.');
logger.fontColor('blue', 'Bold, blue', {
    bold: true,
    underscore: false,
 });
logger.fontColor('blue', 'Bold, dim, underscore, reverse', {
    bold: true,
    dim: true,
    underscore: true,
    reverse: true,
 });
 logger.fontColor('blue', 'Bold, underscore, blue.', {
    bold: true,
    dim: false,
    underscore: true,
    reverse: false,
 });
logger.log('\n');

logger.log('******************************');
logger.log('*** Test Background Color ****');
logger.log('******************************');
logger.bgColor('red', 'Background in red.');
logger.bgColor('black', 'Background in black.');
logger.bgColor('green', 'Background in green.');
logger.bgColor('yellow', 'Background in yellow.');
logger.bgColor('blue', 'Background in blue.');
logger.bgColor('magenta', 'Background in magenta.');
logger.bgColor('cyan', 'Background in cyan.');
logger.bgColor('white', 'Background in white.');
logger.bgColor('blue', 'Bold, blue', {
    bold: true,
    underscore: false,
 });
logger.bgColor('blue', 'Bold, dim, underscore, reverse', {
    bold: true,
    dim: true,
    underscore: true,
    reverse: true,
 });
 logger.bgColor('blue', 'Bold, underscore, blue.', {
    bold: true,
    dim: false,
    underscore: true,
    reverse: false,
 });
logger.log('\n');

logger.log('***********************');
logger.log('*** Test Set Color ****');
logger.log('***********************');
logger.setColor({
    font: 'red',
    bg: 'black'
}, 'Red font in black background.');
logger.setColor({
    font: 'blue',
    bg: 'yellow'
}, 'blue font in yellow background.');
logger.setColor({
    font: 'red',
    bg: 'green'
}, 'Red font in green background.');
logger.setColor({
    font: 'red',
    bg: 'green'
}, 'Red font in green background, underscore.',{
    underscore: true,
    reverse: false,
 });
logger.setColor({
    font: 'red',
    bg: 'green'
}, 'Red font in green background, bold, underscore, reverse.',{
    bold: true,
    dim: false,
    underscore: true,
    reverse: true,
 });
logger.log('\n');

logger.log('**********************');
logger.log('*** Test Level Log ***');
logger.log('**********************');
logger.degug('This is debug mode');
logger.error('This is error mode');
logger.info('This is info mode');
logger.warn('This is warn mode');
logger.log('\n');

logger.log('*************************');
logger.log('*** Test Wrong Usage ****');
logger.log('*************************');
logger.fontColor('test', 'Should be no color.');
logger.bgColor('test', 'Should be no color.');
logger.setColor({
    font: 'test',
    bg: 'blue'
}, 'Font color warning.');
logger.setColor({
    font: 'red',
    bg: 'test'
}, 'Background color warning.');
logger.setColor({
    font: 'test',
    bg: 'test'
}, 'Font and background color warning.');
logger.fontColor('red', 'Wrong setting.', {
    width: true,
});
logger.bgColor('red', 'Wrong setting.', {
    dim: 'true',
});
logger.bgColor('red', 'Wrong setting.', {
    bold: 4
});