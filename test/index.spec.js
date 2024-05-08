const logger = require('../index');

describe('log chain', () => {
    test('blue and underscore.', () => {
        logger.color('blue').underscore().log('blue and underscore.');
        
        expect(logger.lastCommand).toBe('\x1b[34m\x1b[4mblue and underscore.\x1b[0m');
    });

    test('blue and reverse.', () => {
        logger.color('blue').reverse().log('blue and reverse.');
        
        expect(logger.lastCommand).toBe('\x1b[34m\x1b[7mblue and reverse.\x1b[0m');
    });

    test('blue and dim.', () => {
        logger.color('blue').dim().log('blue and dim.');
        
        expect(logger.lastCommand).toBe('\x1b[34m\x1b[2mblue and dim.\x1b[0m');
    });

    test('blue and italic.', () => {
        logger.color('blue').italic().log('blue and italic.');
        
        expect(logger.lastCommand).toBe('\x1b[34m\x1b[3mblue and italic.\x1b[0m');
    });

    test('blue and strikethrough.', () => {
        logger.color('blue').strikethrough().log('blue and strikethrough.');
        
        expect(logger.lastCommand).toBe('\x1b[34m\x1b[9mblue and strikethrough.\x1b[0m');
    });

    test('Red and Bold.', () => {
        logger.color('red').bold().log('Red and Bold.');
        
        expect(logger.lastCommand).toBe('\x1b[31m\x1b[1mRed and Bold.\x1b[0m');
    });

    test('blue, yellow, bold, italic.', () => {
        logger.color('blue').bgColor('yellow').bold().italic().log('blue, yellow, bold, italic.');
        
        expect(logger.lastCommand).toBe('\x1b[34m\x1b[43m\x1b[1m\x1b[3mblue, yellow, bold, italic.\x1b[0m');
    });

    test('this should be normal.', () => {
        logger.log('this should be normal.')
        
        expect(logger.lastCommand).toBe('this should be normal.\x1b[0m');
    });

    test('bold, italic, blue, yellow.', () => {
        logger.bold().italic().color('blue').bgColor('yellow').log('bold, italic, blue, yellow.');
        
        expect(logger.lastCommand).toBe('\x1b[1m\x1b[3m\x1b[34m\x1b[43mbold, italic, blue, yellow.\x1b[0m');
    });
});

// deprecated joint
describe('joint', () => {
    test('1 joint', () => {
        logger
            .color('yellow').log('font in yellow,')
            .joint().bgColor('red').log('background in red,');
        
        expect(logger.lastCommand).toBe('\x1b[1A\x1b[33mfont in yellow,\x1b[0m\x1b[41mbackground in red,\x1b[0m');
    });
    
    test('2 joint', () => {
        logger
            .color('yellow').log('font in yellow,').joint()
            .bgColor('red').log('background in red,').joint()
            .color('yellow').log('font in yellow');
        
        expect(logger.lastCommand).toBe('\x1b[1A\x1b[33mfont in yellow,\x1b[0m\x1b[41mbackground in red,\x1b[0m\x1b[33mfont in yellow\x1b[0m');
    });
})

describe('append', () => {
    test('1 append', () => {
        logger.color('yellow').append('font in yellow,').bgColor('red').log('background in red');
        
        expect(logger.lastCommand).toBe('\x1b[33mfont in yellow,\x1b[41mbackground in red\x1b[0m');
    })

    test('2 append', () => {
        logger.color('yellow').append('font in yellow,')
            .bgColor('red').append('background in red,').reset()
            .color('yellow').log('font in yellow');
        
        expect(logger.lastCommand).toBe('\x1b[33mfont in yellow,\x1b[41mbackground in red,\x1b[0m\x1b[33mfont in yellow\x1b[0m');
    })
})

describe('fontColorLog', () => {
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

describe('bgColorLog', () => {
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

describe('colorLog', () => {
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

describe('Level Log', () => {
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