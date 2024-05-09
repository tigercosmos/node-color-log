const logger = require('../../index');

/**
 * @param {string} command 
 * @returns {number}
 */
const getLevelLogTimestamp = (command) => {
    const logFirstSpaceIndex = command.indexOf(' ');
    const logDateStr = command.slice(0, logFirstSpaceIndex);
    return (new Date(logDateStr)).getTime();
}

/**
 * @param {string} command 
 * @returns {string}
 */
const getLevelLogMessage = (command) => {
    const logFirstSpaceIndex = command.indexOf(' ');
    const logMessage = command.slice(logFirstSpaceIndex + 1);
    return logMessage;
}

/**
 * @param {'success'|'debug'|'info'|'warn'|'error'} level 
 * @param {string} message 
 * @returns {string}
 */
const createLevelLogMessage = (level, message) => {
    switch(level) {
        case 'success':
            return `\x1b[42m\x1b[30m[SUCCESS]\x1b[0m \x1b[32m${message}\x1b[0m`;
        case 'debug':
            return `\x1b[46m\x1b[30m[DEBUG]\x1b[0m \x1b[36m${message}\x1b[0m`;
        case 'info':
            return `\x1b[42m\x1b[30m[INFO]\x1b[0m \x1b[32m${message}\x1b[0m`;
        case 'warn':
            return `\x1b[43m\x1b[30m[WARN]\x1b[0m \x1b[33m${message}\x1b[0m`;
        case 'error':
            return `\x1b[41m[ERROR]\x1b[0m \x1b[31m${message}\x1b[0m`;
        default:
            return '';
    }
}

describe('common level log', () => {
    test('This is debug mode', () => {
        logger.debug('This is debug mode');
        expect(Date.now() - getLevelLogTimestamp(logger.lastCommand)).toBeLessThan(5 * 1000);
        expect(getLevelLogMessage(logger.lastCommand)).toBe(createLevelLogMessage('debug', 'This is debug mode'));
    })

    test('This is error mode', () => {
        logger.error('This is error mode');
        expect(Date.now() - getLevelLogTimestamp(logger.lastCommand)).toBeLessThan(5 * 1000);
        expect(getLevelLogMessage(logger.lastCommand)).toBe(createLevelLogMessage('error', 'This is error mode'));
    })

    test('This is info mode', () => {
        logger.info('This is info mode');
        expect(Date.now() - getLevelLogTimestamp(logger.lastCommand)).toBeLessThan(5 * 1000);
        expect(getLevelLogMessage(logger.lastCommand)).toBe(createLevelLogMessage('info', 'This is info mode'));
    })

    test('This is warn mode', () => {
        logger.warn('This is warn mode');
        expect(Date.now() - getLevelLogTimestamp(logger.lastCommand)).toBeLessThan(5 * 1000);
        expect(getLevelLogMessage(logger.lastCommand)).toBe(createLevelLogMessage('warn', 'This is warn mode'));
    })

    test('This is success mode', () => {
        logger.success('This is success mode');
        expect(Date.now() - getLevelLogTimestamp(logger.lastCommand)).toBeLessThan(5 * 1000);
        expect(getLevelLogMessage(logger.lastCommand)).toBe(createLevelLogMessage('success', 'This is success mode'));
    })
})

describe('set level', () => {
    test('set level to debug', () => {
        logger.setLevel('debug');
        expect(logger.level).toBe('debug');

        logger.error('error show');
        expect(Date.now() - getLevelLogTimestamp(logger.lastCommand)).toBeLessThan(5 * 1000);
        expect(getLevelLogMessage(logger.lastCommand)).toBe(createLevelLogMessage('error', 'error show'));

        logger.warn('warn show');
        expect(Date.now() - getLevelLogTimestamp(logger.lastCommand)).toBeLessThan(5 * 1000);
        expect(getLevelLogMessage(logger.lastCommand)).toBe(createLevelLogMessage('warn', 'warn show'));

        logger.info('info show');
        expect(Date.now() - getLevelLogTimestamp(logger.lastCommand)).toBeLessThan(5 * 1000);
        expect(getLevelLogMessage(logger.lastCommand)).toBe(createLevelLogMessage('info', 'info show'));

        logger.debug('debug show');
        expect(Date.now() - getLevelLogTimestamp(logger.lastCommand)).toBeLessThan(5 * 1000);
        expect(getLevelLogMessage(logger.lastCommand)).toBe(createLevelLogMessage('debug', 'debug show'));
        
        logger.level = undefined
    })

    test('set level to info', () => {
        logger.setLevel('info');
        expect(logger.level).toBe('info');

        logger.error('error show');
        expect(Date.now() - getLevelLogTimestamp(logger.lastCommand)).toBeLessThan(5 * 1000);
        expect(getLevelLogMessage(logger.lastCommand)).toBe(createLevelLogMessage('error', 'error show'));

        logger.warn('warn show');
        expect(Date.now() - getLevelLogTimestamp(logger.lastCommand)).toBeLessThan(5 * 1000);
        expect(getLevelLogMessage(logger.lastCommand)).toBe(createLevelLogMessage('warn', 'warn show'));

        logger.info('info show');
        logger.debug('debug will not show');
        expect(Date.now() - getLevelLogTimestamp(logger.lastCommand)).toBeLessThan(5 * 1000);
        expect(getLevelLogMessage(logger.lastCommand)).toBe(createLevelLogMessage('info', 'info show'));

        logger.level = undefined
    })

    test('set level to warn', () => {
        logger.setLevel('warn');
        expect(logger.level).toBe('warn');

        logger.error('error show');
        expect(Date.now() - getLevelLogTimestamp(logger.lastCommand)).toBeLessThan(5 * 1000);
        expect(getLevelLogMessage(logger.lastCommand)).toBe(createLevelLogMessage('error', 'error show'));

        logger.warn('warn show');
        logger.info('info will not show');
        logger.debug('debug will not show');
        expect(Date.now() - getLevelLogTimestamp(logger.lastCommand)).toBeLessThan(5 * 1000);
        expect(getLevelLogMessage(logger.lastCommand)).toBe(createLevelLogMessage('warn', 'warn show'));

        logger.level = undefined
    })

    test('set level to error', () => {
        logger.setLevel('error');
        expect(logger.level).toBe('error');

        logger.error('error show');
        logger.warn('warn will not show');
        logger.info('info will not show');
        logger.debug('debug will not show');
        expect(Date.now() - getLevelLogTimestamp(logger.lastCommand)).toBeLessThan(5 * 1000);
        expect(getLevelLogMessage(logger.lastCommand)).toBe(createLevelLogMessage('error', 'error show'));

        logger.level = undefined
    })
})

describe('level no color', () => {
    test('set level no color', () => {
        logger.setLevelNoColor();
        expect(logger.noColor).toBe(true);

        logger.error('error show');
        expect(Date.now() - getLevelLogTimestamp(logger.lastCommand)).toBeLessThan(5 * 1000);
        expect(getLevelLogMessage(logger.lastCommand)).toBe(' [ERROR]  error show');

        logger.warn('warn show');
        expect(Date.now() - getLevelLogTimestamp(logger.lastCommand)).toBeLessThan(5 * 1000);
        expect(getLevelLogMessage(logger.lastCommand)).toBe(' [WARN]  warn show');

        logger.info('info show');
        expect(Date.now() - getLevelLogTimestamp(logger.lastCommand)).toBeLessThan(5 * 1000);
        expect(getLevelLogMessage(logger.lastCommand)).toBe(' [INFO]  info show');

        logger.debug('debug show');
        expect(Date.now() - getLevelLogTimestamp(logger.lastCommand)).toBeLessThan(5 * 1000);
        expect(getLevelLogMessage(logger.lastCommand)).toBe(' [DEBUG]  debug show');

        logger.noColor = false
    })
})
