process.env.LOGGER = 'info'
const logger = require('../../index');
const {
    getLevelLogMessage, 
    getLevelLogTimestamp,
    createLevelLogMessage
} = require('./utils/levelLogUtils');

describe('Environment Variable LOGGER', () => {
    test('LOGGER=info, debug and success level will not show', () => {
        logger.error('error show');
        logger.warn('warn show');
        logger.info('info show');
        logger.debug('debug will not show');
        logger.success('success will not show');

        expect(Date.now() - getLevelLogTimestamp(logger.lastCommand)).toBeLessThan(5 * 1000);
        expect(getLevelLogMessage(logger.lastCommand)).toBe(createLevelLogMessage('info', 'info show'));
    })
})