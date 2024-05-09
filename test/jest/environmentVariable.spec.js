process.env.LOGGER = 'info'
const logger = require('../../index');
const {
    getLevelLogMessage, 
    getLevelLogTimestamp,
    createLevelLogMessage
} = require('./utils/levelLogUtils');

logger._customizedConsole.error = () => {}

describe('Environment Variable LOGGER', () => {
    test('LOGGER=info, debug and success level will not show', () => {
        logger.error('error show');
        logger.warn('warn show');
        logger.info('info show');
        logger.debug('debug will not show');
        logger.success('success will not show');

        expect(
            Date.now() - getLevelLogTimestamp(logger.lastCommand),
            'Log time error exceeds 5 seconds'
        ).toBeLessThan(5 * 1000);
        expect(getLevelLogMessage(logger.lastCommand), 'Message mismatch').toBe(createLevelLogMessage('info', 'info show'));
    })
})