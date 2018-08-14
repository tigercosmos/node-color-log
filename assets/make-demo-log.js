const logger = require('../index');

logger.log(`logger.log`);
logger.bold().log(`logger.bold().log`);
logger.underscore().log(`logger.underscore().log`);
logger.reverse().log(`logger.reverse().log`);
logger.dim().log(`logger.dim().log`);
logger.italic().log(`logger.italic().log`);
logger.strikethrough().log(`logger.strikethrough().log`);
logger.color('yellow').bold().log(`logger.color('yellow').bold().log`)
logger.color('yellow').underscore().log(`logger.color('yellow').underscore().log`);
logger.color('yellow').reverse().log(`logger.color('yellow').reverse().log`);
logger.color('yellow').dim().log(`logger.color('yellow').dim().log`);
logger.color('yellow').italic().log(`logger.color('yellow').italic().log`);
logger.color('yellow').strikethrough().log(`logger.color('yellow').strikethrough().log`);
logger.color('blue').bgColor('white').bold().log(`logger.color('blue').bgColor('white').bold().log`)
logger.color('blue').bgColor('white').underscore().log(`logger.color('blue').bgColor('white').underscore().log`);
logger.color('blue').bgColor('white').reverse().log(`logger.color('blue').bgColor('white').reverse().log`);
logger.color('blue').bgColor('white').dim().log(`logger.color('blue').bgColor('white').dim().log`);
logger.color('blue').bgColor('white').italic().log(`logger.color('blue').bgColor('white').italic().log`);
logger.color('blue').bgColor('white').strikethrough().log(`logger.color('blue').bgColor('white').strikethrough().log`);
logger.color('white').bgColor('red')
.bold().italic().dim().reverse().underscore().strikethrough()
.log(`logger.color('white').bgColor('red').bold().italic().dim().reverse().underscore().strikethrough().log`);