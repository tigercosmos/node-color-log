const logger = require('../index');

// $ LOGGER=info node test2.js
logger.log('****************************************');
logger.log('*** Test Environment Variable LOGGER ***');
logger.log('****************************************');
logger.log("LOGGER=info, debug level will not show");
logger.error('error show');
logger.warn('warn show');
logger.info('info show');
logger.debug('debug will not show');
logger.success('success show');
