const logger = require('./index');

logger.setLogFile('log.txt')

logger.log('****************');
logger.log('*** Test log ***');
logger.log('****************');

logger.color('red').bold().log("First message").joint()
      .bgColor('white').italic().log("Second message").joint()
      .strikethrough().log("Third message");

for (let index = 0; index < 10; index++) {
    logger.log(index);
}
