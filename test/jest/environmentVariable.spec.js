process.env.LOGGER = 'info'
const logger = require('../../index');
const {
    getLevelLogMessage, 
    createLevelLogMessage
} = require('./utils/levelLogUtils');

logger._customizedConsole.error = () => {}

describe('Environment Variable LOGGER', () => {
    test('LOGGER=info, debug and success level will not show', () => {
        logger.info('info show');
        logger.debug('debug will not show');
        logger.success('success will not show');

        expect(getLevelLogMessage(logger.lastCommand), 'Message mismatch').toBe(createLevelLogMessage('info', 'info show'));
    })
})