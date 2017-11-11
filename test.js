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
logger.log('-------')
logger.bgColor('red', 'Background in red.');
logger.bgColor('black', 'Background in black.');
logger.bgColor('green', 'Background in green.');
logger.bgColor('yellow', 'Background in yellow.');
logger.bgColor('blue', 'Background in blue.');
logger.bgColor('magenta', 'Background in magenta.');
logger.bgColor('cyan', 'Background in cyan.');
logger.bgColor('white', 'Background in white.');
logger.log('-------')
logger.fontColor('test', 'Wrong font color test.');
logger.bgColor('test', 'Wrong background color test.');
logger.log('-------')
logger.degug('Debug mode');
logger.error('Error mode');
logger.info('Info mode');
logger.warn('Warn mode');
logger.log('-------')
logger.setBgColor('red')
logger.setFontColor('black');
logger.log('Red font in black background.')
logger.log('-------')
logger.setBgColor('yellow')
logger.setFontColor('blue');
logger.log('Yellow font in blue background.')
logger.log('-------')
logger.reset();
logger.log('should be reset')
