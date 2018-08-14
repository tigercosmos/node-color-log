const logger = require('../index');

logger.debug('logger.debug() prints prefix "DEBUG: " with background and text in color cyan');
logger.error('logger.error() prints prefix "ERROR: " with background and text in color red');
logger.info('logger.info() prints prefix "INFO: " with background and text in color green');
logger.warn('logger.warn() prints prefix "WARN: " with background and text in color yellow');