const logger = require('../index');

logger.log('****************');
logger.log('*** Test File and Line ***');
logger.log('****************');

function foo() {
    bar();
}

function bar() {
    logger.enableFileAndLine(true);

    logger.debug('This log should include file and line information.');
    logger.info('Another log with file and line information.');


    logger.enableFileAndLine(true, true);

    logger.debug('This log should include file and line information.');
    logger.info('Another log with file and line information.');
}

foo();