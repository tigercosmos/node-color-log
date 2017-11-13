const Logger = require('./index');
const logger = new Logger();

logger.fontColor('red', 'Font in red.');
logger.fontColor('black', 'Font in black.');
logger.fontColor('green', 'Font in green.');
logger.fontColor('yellow', 'Font in yellow.');
logger.fontColor('blue', 'Font in blue.');
logger.fontColor('magenta', 'Font in magenta.');
logger.fontColor('cyan', 'Font in cyan.');
logger.fontColor('white', 'Font in white.');
logger.log('-------');
logger.bgColor('red', 'Background in red.');
logger.bgColor('black', 'Background in black.');
logger.bgColor('green', 'Background in green.');
logger.bgColor('yellow', 'Background in yellow.');
logger.bgColor('blue', 'Background in blue.');
logger.bgColor('magenta', 'Background in magenta.');
logger.bgColor('cyan', 'Background in cyan.');
logger.bgColor('white', 'Background in white.');
logger.log('-------');
logger.debug('This is debug mode');
logger.error('This is error mode');
logger.info('This is info mode');
logger.warn('This is warn mode');
logger.log('-------')
logger.fontColor('test', 'Wrong font color test.');
logger.bgColor('test', 'Wrong background color test.');
logger.log('-------')
logger.setColor({
    font: 'red',
    bg: 'black'
}, 'Red font in black background.');
logger.log('-------')
logger.setColor({
    font: 'blue',
    bg: 'yellow'
}, 'blue font in yellow background.');
logger.log('-------')
logger.setColor({
    font: 'test',
    bg: 'blue'
}, 'Wrong font color in blue background.');
logger.log('-------')
logger.setColor({
    font: 'red',
    bg: 'test'
}, 'Red font color in wrong background color.');
logger.log('-------')
logger.setColor({
    font: 'test',
    bg: 'test'
}, 'Wrong font color in wrong background color.');
logger.log('-------')
logger.log('should be reset')
