const logger = require('../../index');

logger._customizedConsole.error = () => {}

describe('fontColorLog()', () => {
    test('Font in red.', () => {
        logger.fontColorLog('red', 'Font in red.');
        
        expect(logger.lastCommand).toBe('\x1b[31mFont in red.\x1b[0m');
    })

    test('Font in black.', () => {
        logger.fontColorLog('black', 'Font in black.');
        
        expect(logger.lastCommand).toBe('\x1b[30mFont in black.\x1b[0m');
    })

    test('Font in green.', () => {
        logger.fontColorLog('green', 'Font in green.');
        
        expect(logger.lastCommand).toBe('\x1b[32mFont in green.\x1b[0m');
    })

    test('Font in yellow.', () => {
        logger.fontColorLog('yellow', 'Font in yellow.');
        
        expect(logger.lastCommand).toBe('\x1b[33mFont in yellow.\x1b[0m');
    })

    test('Font in blue.', () => {
        logger.fontColorLog('blue', 'Font in blue.');
        
        expect(logger.lastCommand).toBe('\x1b[34mFont in blue.\x1b[0m');
    })

    test('Font in magenta.', () => {
        logger.fontColorLog('magenta', 'Font in magenta.');
        
        expect(logger.lastCommand).toBe('\x1b[35mFont in magenta.\x1b[0m');
    })

    test('Font in cyan.', () => {
        logger.fontColorLog('cyan', 'Font in cyan.');
        
        expect(logger.lastCommand).toBe('\x1b[36mFont in cyan.\x1b[0m');
    })

    test('Font in white.', () => {
        logger.fontColorLog('white', 'Font in white.');
        
        expect(logger.lastCommand).toBe('\x1b[37mFont in white.\x1b[0m');
    })

    test('Bold, blue, italic', () => {
        logger.fontColorLog('blue', 'Bold, blue, italic', {
            bold: true,
            underscore: false,
            italic: true
        });
        
        expect(logger.lastCommand).toBe('\x1b[1m\x1b[3m\x1b[34mBold, blue, italic\x1b[0m');
    })

    test('Bold, dim, underscore, reverse', () => {
        logger.fontColorLog('blue', 'Bold, dim, underscore, reverse', {
            bold: true,
            dim: true,
            underscore: true,
            reverse: true,
        });
        
        expect(logger.lastCommand).toBe('\x1b[1m\x1b[2m\x1b[4m\x1b[7m\x1b[34mBold, dim, underscore, reverse\x1b[0m');
    })

    test('Bold, underscore, blue.', () => {
        logger.fontColorLog('blue', 'Bold, underscore, blue.', {
            bold: true,
            dim: false,
            underscore: true,
            reverse: false,
        });
        
        expect(logger.lastCommand).toBe('\x1b[1m\x1b[4m\x1b[34mBold, underscore, blue.\x1b[0m');
    })
})

describe('bgColorLog()', () => {
    test('Background in red.', () => {
        logger.bgColorLog('red', 'Background in red.');
        
        expect(logger.lastCommand).toBe('\x1b[41mBackground in red.\x1b[0m');
    })

    test('Background in black.', () => {
        logger.bgColorLog('black', 'Background in black.');
        
        expect(logger.lastCommand).toBe('\x1b[40mBackground in black.\x1b[0m');
    })

    test('Background in green.', () => {
        logger.bgColorLog('green', 'Background in green.');
        
        expect(logger.lastCommand).toBe('\x1b[42mBackground in green.\x1b[0m');
    })

    test('Background in yellow.', () => {
        logger.bgColorLog('yellow', 'Background in yellow.');
        
        expect(logger.lastCommand).toBe('\x1b[43mBackground in yellow.\x1b[0m');
    })

    test('Background in blue.', () => {
        logger.bgColorLog('blue', 'Background in blue.');
        
        expect(logger.lastCommand).toBe('\x1b[44mBackground in blue.\x1b[0m');
    })

    test('Background in magenta.', () => {
        logger.bgColorLog('magenta', 'Background in magenta.');
        
        expect(logger.lastCommand).toBe('\x1b[45mBackground in magenta.\x1b[0m');
    })

    test('Background in cyan.', () => {
        logger.bgColorLog('cyan', 'Background in cyan.');
        
        expect(logger.lastCommand).toBe('\x1b[46mBackground in cyan.\x1b[0m');
    })

    test('Background in white.', () => {
        logger.bgColorLog('white', 'Background in white.');
        
        expect(logger.lastCommand).toBe('\x1b[47mBackground in white.\x1b[0m');
    })

    test('Bold, blue', () => {
        logger.bgColorLog('blue', 'Bold, blue', {
            bold: true,
            underscore: false,
        });
        
        expect(logger.lastCommand).toBe('\x1b[1m\x1b[44mBold, blue\x1b[0m');
    })

    test('Bold, dim, underscore, reverse', () => {
        logger.bgColorLog('blue', 'Bold, dim, underscore, reverse', {
            bold: true,
            dim: true,
            underscore: true,
            reverse: true,
        });
        
        expect(logger.lastCommand).toBe('\x1b[1m\x1b[2m\x1b[4m\x1b[7m\x1b[44mBold, dim, underscore, reverse\x1b[0m');
    })

    test('Bold, underscore, blue.', () => {
        logger.bgColorLog('blue', 'Bold, underscore, blue.', {
            bold: true,
            dim: false,
            underscore: true,
            reverse: false,
        });
        
        expect(logger.lastCommand).toBe('\x1b[1m\x1b[4m\x1b[44mBold, underscore, blue.\x1b[0m');
    })
})

describe('colorLog()', () => {
    test('Red font in black background.', () => {
        logger.colorLog({
            font: 'red',
            bg: 'black'
        }, 'Red font in black background.');
        
        expect(logger.lastCommand).toBe('\x1b[31m\x1b[40mRed font in black background.\x1b[0m');
    })

    test('blue font in yellow background.', () => {
        logger.colorLog({
            font: 'blue',
            bg: 'yellow'
        }, 'blue font in yellow background.');
        
        expect(logger.lastCommand).toBe('\x1b[34m\x1b[43mblue font in yellow background.\x1b[0m');
    })

    test('blue font in yellow background.', () => {
        logger.colorLog({
            font: 'red',
            bg: 'green'
        }, 'Red font in green background.');
        
        expect(logger.lastCommand).toBe('\x1b[31m\x1b[42mRed font in green background.\x1b[0m');
    })

    test('blue font in yellow background.', () => {
        logger.colorLog({
            font: 'red',
            bg: 'green'
        }, 'Red font in green background, underscore, strikethrough.', {
            underscore: true,
            reverse: false,
            strikethrough: true
        });
        
        expect(logger.lastCommand).toBe('\x1b[4m\x1b[9m\x1b[31m\x1b[42mRed font in green background, underscore, strikethrough.\x1b[0m');
    })

    test('Red font in green background, bold, underscore, reverse, strikethrough.', () => {
        logger.colorLog({
            font: 'red',
            bg: 'green'
        }, 'Red font in green background, bold, underscore, reverse, strikethrough.', {
            bold: true,
            dim: false,
            underscore: true,
            reverse: true,
            strikethrough: true
        });
        
        expect(logger.lastCommand).toBe('\x1b[1m\x1b[4m\x1b[7m\x1b[9m\x1b[31m\x1b[42mRed font in green background, bold, underscore, reverse, strikethrough.\x1b[0m');
    })
})

afterEach(() => {
    // restore the spy created with spyOn
    jest.restoreAllMocks();
});

describe('Wrong Usage', () => {
    test('Pass wrong font color string to fontColorLog()', () => {
        jest.spyOn(console, 'error');

        logger.fontColorLog('test', 'Should be no color.');

        expect(console.error).toHaveBeenCalledWith('node-color-log warning: Font color not found! Use the default.');
        expect(logger.lastCommand).toBe('Should be no color.\x1b[0m');
    })

    test('Pass wrong background color string to bgColorLog()', () => {
        jest.spyOn(console, 'error');

        logger.bgColorLog('test', 'Should be no color.');

        expect(console.error).toHaveBeenCalledWith('node-color-log warning: Background color not found! Use the default.');
        expect(logger.lastCommand).toBe('Should be no color.\x1b[0m');
    })

    test('Pass wrong font color string to colorLog()', () => {
        jest.spyOn(console, 'error');

        logger.colorLog({
            font: 'test',
            bg: 'blue'
        }, 'Font color warning.');

        expect(console.error).toHaveBeenCalledWith('node-color-log warning: Font color not found! Use the default.');
        expect(logger.lastCommand).toBe('\x1b[44mFont color warning.\x1b[0m');
    })

    test('Pass wrong background color string to colorLog()', () => {
        jest.spyOn(console, 'error');

        logger.colorLog({
            font: 'red',
            bg: 'test'
        }, 'Background color warning.');

        expect(console.error).toHaveBeenCalledWith('node-color-log warning: Background color not found! Use the default.');
        expect(logger.lastCommand).toBe('\x1b[31mBackground color warning.\x1b[0m');
    })

    test('Pass wrong font color string and background color string to colorLog()', () => {
        jest.spyOn(console, 'error');

        logger.colorLog({
            font: 'test',
            bg: 'test'
        }, 'Font and background color warning.');

        expect(console.error).toHaveBeenCalledWith('node-color-log warning: Font color not found! Use the default.');
        expect(console.error).toHaveBeenCalledWith('node-color-log warning: Background color not found! Use the default.');
        expect(logger.lastCommand).toBe('Font and background color warning.\x1b[0m');
    })

    test('Pass wrong setting to fontColorLog()', () => {
        jest.spyOn(console, 'error');

        logger.fontColorLog('red', 'Wrong setting.', {
            width: true,
        });

        expect(console.error).toHaveBeenCalledWith(`node-color-log warning: width is not valid in setting.`);
        expect(logger.lastCommand).toBe('\x1b[31mWrong setting.\x1b[0m');
    })

    test('Pass wrong setting to bgColorLog()', () => {
        jest.spyOn(console, 'error');

        logger.bgColorLog('red', 'Wrong setting.', {
            dim: 'true',
        });

        expect(console.error).toHaveBeenCalledWith('node-color-log warning: The value dim should be boolean.');
        expect(logger.lastCommand).toBe('\x1b[41mWrong setting.\x1b[0m');
    })

    test('Pass wrong setting to bgColorLog()', () => {
        jest.spyOn(console, 'error');

        logger.bgColorLog('red', 'Wrong setting.', {
            bold: 4
        });

        expect(console.error).toHaveBeenCalledWith('node-color-log warning: The value bold should be boolean.');
        expect(logger.lastCommand).toBe('\x1b[41mWrong setting.\x1b[0m');
    })
})