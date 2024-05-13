const logger = require('../../index');
const {
    getLevelLogMessage, 
    createLevelLogMessage
} = require('./utils/levelLogUtils');

logger._customizedConsole.error = () => {}

describe('Common Level Log', () => {
    test('This is debug mode', () => {
        logger.debug('This is debug mode');
        expect(getLevelLogMessage(logger.lastCommand), 'Message mismatch').toBe(createLevelLogMessage('debug', 'This is debug mode'));
    })

    test('This is error mode', () => {
        logger.error('This is error mode');
        expect(getLevelLogMessage(logger.lastCommand), 'Message mismatch').toBe(createLevelLogMessage('error', 'This is error mode'));
    })

    test('This is info mode', () => {
        logger.info('This is info mode');
        expect(getLevelLogMessage(logger.lastCommand), 'Message mismatch').toBe(createLevelLogMessage('info', 'This is info mode'));
    })

    test('This is warn mode', () => {
        logger.warn('This is warn mode');
        expect(getLevelLogMessage(logger.lastCommand), 'Message mismatch').toBe(createLevelLogMessage('warn', 'This is warn mode'));
    })

    test('This is success mode', () => {
        logger.success('This is success mode');
        expect(getLevelLogMessage(logger.lastCommand), 'Message mismatch').toBe(createLevelLogMessage('success', 'This is success mode'));
    })
})

describe('Set Level', () => {
    test('set level to debug', () => {
        logger.setLevel('debug');
        expect(logger.level).toBe('debug');

        logger.error('error show');
        expect(getLevelLogMessage(logger.lastCommand), 'Message mismatch').toBe(createLevelLogMessage('error', 'error show'));

        logger.warn('warn show');
        expect(getLevelLogMessage(logger.lastCommand), 'Message mismatch').toBe(createLevelLogMessage('warn', 'warn show'));

        logger.info('info show');
        expect(getLevelLogMessage(logger.lastCommand), 'Message mismatch').toBe(createLevelLogMessage('info', 'info show'));

        logger.debug('debug show');
        expect(getLevelLogMessage(logger.lastCommand), 'Message mismatch').toBe(createLevelLogMessage('debug', 'debug show'));
        
        logger.level = undefined
    })

    test('set level to info', () => {
        logger.setLevel('info');
        expect(logger.level).toBe('info');

        logger.error('error show');
        expect(getLevelLogMessage(logger.lastCommand), 'Message mismatch').toBe(createLevelLogMessage('error', 'error show'));

        logger.warn('warn show');
        expect(getLevelLogMessage(logger.lastCommand), 'Message mismatch').toBe(createLevelLogMessage('warn', 'warn show'));

        logger.info('info show');
        logger.debug('debug will not show');
        expect(getLevelLogMessage(logger.lastCommand), 'Message mismatch').toBe(createLevelLogMessage('info', 'info show'));

        logger.level = undefined
    })

    test('set level to warn', () => {
        logger.setLevel('warn');
        expect(logger.level).toBe('warn');

        logger.error('error show');
        expect(getLevelLogMessage(logger.lastCommand), 'Message mismatch').toBe(createLevelLogMessage('error', 'error show'));

        logger.warn('warn show');
        logger.info('info will not show');
        logger.debug('debug will not show');
        expect(getLevelLogMessage(logger.lastCommand), 'Message mismatch').toBe(createLevelLogMessage('warn', 'warn show'));

        logger.level = undefined
    })

    test('set level to error', () => {
        logger.setLevel('error');
        expect(logger.level).toBe('error');

        logger.error('error show');
        logger.warn('warn will not show');
        logger.info('info will not show');
        logger.debug('debug will not show');
        expect(getLevelLogMessage(logger.lastCommand), 'Message mismatch').toBe(createLevelLogMessage('error', 'error show'));

        logger.level = undefined
    })
})

describe('Level No Color', () => {
    test('set level no color', () => {
        logger.setLevelNoColor();
        expect(logger.noColor).toBe(true);

        logger.error('error show');
        expect(getLevelLogMessage(logger.lastCommand), 'Message mismatch').toBe(' [ERROR]  error show');

        logger.warn('warn show');
        expect(getLevelLogMessage(logger.lastCommand), 'Message mismatch').toBe(' [WARN]  warn show');

        logger.info('info show');
        expect(getLevelLogMessage(logger.lastCommand), 'Message mismatch').toBe(' [INFO]  info show');

        logger.debug('debug show');
        expect(getLevelLogMessage(logger.lastCommand), 'Message mismatch').toBe(' [DEBUG]  debug show');

        logger.noColor = false
    })
})

describe('Level Multiple Arguments', () => {
    test('error show', () => {
        logger.error('error show', 'error show 2');
        expect(getLevelLogMessage(logger.lastCommand), 'Message mismatch')
            .toBe(createLevelLogMessage('error', `error show error show 2`));
    })


    test('warn show json', () => {
        logger.warn('warn show', {a: 1, b: 2});
        expect(getLevelLogMessage(logger.lastCommand), 'Message mismatch')
            .toBe(createLevelLogMessage('warn', `warn show ${JSON.stringify({a: 1, b: 2})}`));
    })

    test('info show json', () => {
        logger.info('info show', {a: [1, 2, 4]}, [4, 4, 4]);
        expect(getLevelLogMessage(logger.lastCommand), 'Message mismatch')
            .toBe(createLevelLogMessage('info', `info show ${JSON.stringify({a: [1, 2, 4]})} ${JSON.stringify([4, 4, 4])}`));
    })

    test('debug show json', () => {
        logger.debug('debug show', [1, 2, 3]);
        expect(getLevelLogMessage(logger.lastCommand), 'Message mismatch')
            .toBe(createLevelLogMessage('debug', `debug show ${JSON.stringify([1, 2, 3])}`));
    })
})

describe('Date Format', () => {
    test('set date format', () => {
        const fixedDate = new Date()
        logger.setDate(() => fixedDate.toLocaleTimeString());
        logger.info("This is an info message");

        const logFirstSpaceIndex = logger.lastCommand.indexOf(' ');
        const logDateStr = logger.lastCommand.slice(0, logFirstSpaceIndex);

        expect(logDateStr).toBe(fixedDate.toLocaleTimeString());

        logger.setDate(() => (new Date()).toISOString());
    })
})

describe('Special Object', () => {
    test('Should print "[object Object]" and not throw an error:', () => {
        const object = {}
        object.x = object
        logger.info('Should print "[object Object]" and not throw an error:', object);

        expect(getLevelLogMessage(logger.lastCommand), 'Message mismatch')
            .toBe(createLevelLogMessage('info', `Should print "[object Object]" and not throw an error: ${object.toString()}`));
    })
})

describe('Named Level Log', () => {
    test('create named log', () => {
        const namedLogger = logger.createNamedLogger('myLog')

        namedLogger.error('error show');
        expect(getLevelLogMessage(namedLogger.lastCommand), 'Message mismatch').toBe(`[myLog] ${createLevelLogMessage('error', 'error show')}`);

        namedLogger.warn('warn show');
        expect(getLevelLogMessage(namedLogger.lastCommand), 'Message mismatch').toBe(`[myLog] ${createLevelLogMessage('warn', 'warn show')}`);

        namedLogger.info('info show');
        expect(getLevelLogMessage(namedLogger.lastCommand), 'Message mismatch').toBe(`[myLog] ${createLevelLogMessage('info', 'info show')}`);
    })
})
