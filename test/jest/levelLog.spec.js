const logger = require('../../index');

const getLevelLogTimestamp = (command) => {
    const logFirstSpaceIndex = command.indexOf(' ');
    const logDateStr = command.slice(0, logFirstSpaceIndex);
    return (new Date(logDateStr)).getTime();
}

const getLevelLogMessage = (command) => {
    const logFirstSpaceIndex = command.indexOf(' ');
    const logMessage = command.slice(logFirstSpaceIndex + 1);
    return logMessage;
}

describe('common level log', () => {
    test('This is debug mode', () => {
        expect.assertions(2);

        logger.debug('This is debug mode');

        const logTimestamp = getLevelLogTimestamp(logger.lastCommand);
        const logMessage = getLevelLogMessage(logger.lastCommand);

        expect(Date.now() - logTimestamp).toBeLessThan(5 * 1000);
        expect(logMessage).toBe('\x1b[46m\x1b[30m[DEBUG]\x1b[0m \x1b[36mThis is debug mode\x1b[0m');
    })

    test('This is error mode', () => {
        expect.assertions(2);

        logger.error('This is error mode');

        const logTimestamp = getLevelLogTimestamp(logger.lastCommand);
        const logMessage = getLevelLogMessage(logger.lastCommand);

        expect(Date.now() - logTimestamp).toBeLessThan(5 * 1000);
        expect(logMessage).toBe('\x1b[41m[ERROR]\x1b[0m \x1b[31mThis is error mode\x1b[0m');
    })

    test('This is info mode', () => {
        expect.assertions(2);

        logger.info('This is info mode');

        const logTimestamp = getLevelLogTimestamp(logger.lastCommand);
        const logMessage = getLevelLogMessage(logger.lastCommand);

        expect(Date.now() - logTimestamp).toBeLessThan(5 * 1000);
        expect(logMessage).toBe('\x1b[42m\x1b[30m[INFO]\x1b[0m \x1b[32mThis is info mode\x1b[0m');
    })

    test('This is warn mode', () => {
        expect.assertions(2);

        logger.warn('This is warn mode');

        const logTimestamp = getLevelLogTimestamp(logger.lastCommand);
        const logMessage = getLevelLogMessage(logger.lastCommand);

        expect(Date.now() - logTimestamp).toBeLessThan(5 * 1000);
        expect(logMessage).toBe('\x1b[43m\x1b[30m[WARN]\x1b[0m \x1b[33mThis is warn mode\x1b[0m');
    })
})