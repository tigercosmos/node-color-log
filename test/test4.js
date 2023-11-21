const logger = require('../index').createNamedLogger("Test 4");

// $ LOGGER=info node test4.js
logger.log('****************************************');
logger.log('*** Test Environment Variable LOGGER ***');
logger.log('****************************************');
logger.log("LOGGER=info, debug level will not show");
logger.error('error show');
logger.warn('warn show');
logger.info('info show');
logger.debug('debug will not show');
logger.success('success show');