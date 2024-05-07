const logger = require('../index');

describe('log chain', () => {
    test('blue and underscore.', () => {
        logger.color('blue').underscore().log('blue and underscore.');
        console.clear()
        
        expect(logger.lastCommand).toBe('\x1b[34m\x1b[4mblue and underscore.\x1b[0m');
    });

    test('blue and reverse.', () => {
        logger.color('blue').reverse().log('blue and reverse.');
        console.clear()
        
        expect(logger.lastCommand).toBe('\x1b[34m\x1b[7mblue and reverse.\x1b[0m');
    });

    test('blue and dim.', () => {
        logger.color('blue').dim().log('blue and dim.');
        console.clear()
        
        expect(logger.lastCommand).toBe('\x1b[34m\x1b[2mblue and dim.\x1b[0m');
    });

    test('blue and italic.', () => {
        logger.color('blue').italic().log('blue and italic.');
        console.clear()
        
        expect(logger.lastCommand).toBe('\x1b[34m\x1b[3mblue and italic.\x1b[0m');
    });

    test('blue and strikethrough.', () => {
        logger.color('blue').strikethrough().log('blue and strikethrough.');
        console.clear()
        
        expect(logger.lastCommand).toBe('\x1b[34m\x1b[9mblue and strikethrough.\x1b[0m');
    });

    test('Red and Bold.', () => {
        logger.color('red').bold().log('Red and Bold.');
        console.clear()
        
        expect(logger.lastCommand).toBe('\x1b[31m\x1b[1mRed and Bold.\x1b[0m');
    });

    test('blue, yellow, bold, italic.', () => {
        logger.color('blue').bgColor('yellow').bold().italic().log('blue, yellow, bold, italic.');
        console.clear()
        
        expect(logger.lastCommand).toBe('\x1b[34m\x1b[43m\x1b[1m\x1b[3mblue, yellow, bold, italic.\x1b[0m');
    });

    test('this should be normal.', () => {
        logger.log('this should be normal.')
        console.clear()
        
        expect(logger.lastCommand).toBe('this should be normal.\x1b[0m');
    });

    test('bold, italic, blue, yellow.', () => {
        logger.bold().italic().color('blue').bgColor('yellow').log('bold, italic, blue, yellow.');
        console.clear()
        
        expect(logger.lastCommand).toBe('\x1b[1m\x1b[3m\x1b[34m\x1b[43mbold, italic, blue, yellow.\x1b[0m');
    });
});

// deprecated joint
describe('joint', () => {
    test('1 joint', () => {
        logger
            .color('yellow').log('font in yellow,')
            .joint().bgColor('red').log('background in red,');
        console.clear()
        
        expect(logger.lastCommand).toBe('\x1b[1A\x1b[33mfont in yellow,\x1b[0m\x1b[41mbackground in red,\x1b[0m');
    });
    
    test('2 joint', () => {
        logger
            .color('yellow').log('font in yellow,').joint()
            .bgColor('red').log('background in red,').joint()
            .color('yellow').log('font in yellow');
        console.clear()
        
        expect(logger.lastCommand).toBe('\x1b[1A\x1b[33mfont in yellow,\x1b[0m\x1b[41mbackground in red,\x1b[0m\x1b[33mfont in yellow\x1b[0m');
    });
})

describe('append', () => {
    test('1 append', () => {
        logger.color('yellow').append('font in yellow,').bgColor('red').log('background in red');
        console.clear()
        
        expect(logger.lastCommand).toBe('\x1b[33mfont in yellow,\x1b[41mbackground in red\x1b[0m');
    })

    test('2 append', () => {
        logger.color('yellow').append('font in yellow,')
            .bgColor('red').append('background in red,').reset()
            .color('yellow').log('font in yellow');
        console.clear()
        
        expect(logger.lastCommand).toBe('\x1b[33mfont in yellow,\x1b[41mbackground in red,\x1b[0m\x1b[33mfont in yellow\x1b[0m');
    })
})

describe('fontColorLog', () => {
    test('Font in red.', () => {
        logger.fontColorLog('red', 'Font in red.');
        console.clear()
        
        expect(logger.lastCommand).toBe('\x1b[31mFont in red.\x1b[0m');
    })

    test('Font in black.', () => {
        logger.fontColorLog('black', 'Font in black.');
        console.clear()
        
        expect(logger.lastCommand).toBe('\x1b[30mFont in black.\x1b[0m');
    })

    test('Font in green.', () => {
        logger.fontColorLog('green', 'Font in green.');
        console.clear()
        
        expect(logger.lastCommand).toBe('\x1b[32mFont in green.\x1b[0m');
    })

    test('Font in yellow.', () => {
        logger.fontColorLog('yellow', 'Font in yellow.');
        console.clear()
        
        expect(logger.lastCommand).toBe('\x1b[33mFont in yellow.\x1b[0m');
    })

    test('Font in blue.', () => {
        logger.fontColorLog('blue', 'Font in blue.');
        console.clear()
        
        expect(logger.lastCommand).toBe('\x1b[34mFont in blue.\x1b[0m');
    })

    test('Font in magenta.', () => {
        logger.fontColorLog('magenta', 'Font in magenta.');
        console.clear()
        
        expect(logger.lastCommand).toBe('\x1b[35mFont in magenta.\x1b[0m');
    })

    test('Font in cyan.', () => {
        logger.fontColorLog('cyan', 'Font in cyan.');
        console.clear()
        
        expect(logger.lastCommand).toBe('\x1b[36mFont in cyan.\x1b[0m');
    })

    test('Font in white.', () => {
        logger.fontColorLog('white', 'Font in white.');
        console.clear()
        
        expect(logger.lastCommand).toBe('\x1b[37mFont in white.\x1b[0m');
    })

    test('Bold, blue, italic', () => {
        logger.fontColorLog('blue', 'Bold, blue, italic', {
            bold: true,
            underscore: false,
            italic: true
        });
        console.clear()
        
        expect(logger.lastCommand).toBe('\x1b[1m\x1b[3m\x1b[34mBold, blue, italic\x1b[0m');
    })

    test('Bold, dim, underscore, reverse', () => {
        logger.fontColorLog('blue', 'Bold, dim, underscore, reverse', {
            bold: true,
            dim: true,
            underscore: true,
            reverse: true,
        });
        console.clear()
        
        expect(logger.lastCommand).toBe('\x1b[1m\x1b[2m\x1b[4m\x1b[7m\x1b[34mBold, dim, underscore, reverse\x1b[0m');
    })

    test('Bold, underscore, blue.', () => {
        logger.fontColorLog('blue', 'Bold, underscore, blue.', {
            bold: true,
            dim: false,
            underscore: true,
            reverse: false,
        });
        console.clear()
        
        expect(logger.lastCommand).toBe('\x1b[1m\x1b[4m\x1b[34mBold, underscore, blue.\x1b[0m');
    })
})

describe('bgColorLog', () => {
    test('Background in red.', () => {
        logger.bgColorLog('red', 'Background in red.');
        console.clear()
        
        expect(logger.lastCommand).toBe('\x1b[41mBackground in red.\x1b[0m');
    })

    test('Background in black.', () => {
        logger.bgColorLog('black', 'Background in black.');
        console.clear()
        
        expect(logger.lastCommand).toBe('\x1b[40mBackground in black.\x1b[0m');
    })

    test('Background in green.', () => {
        logger.bgColorLog('green', 'Background in green.');
        console.clear()
        
        expect(logger.lastCommand).toBe('\x1b[42mBackground in green.\x1b[0m');
    })

    test('Background in yellow.', () => {
        logger.bgColorLog('yellow', 'Background in yellow.');
        console.clear()
        
        expect(logger.lastCommand).toBe('\x1b[43mBackground in yellow.\x1b[0m');
    })

    test('Background in blue.', () => {
        logger.bgColorLog('blue', 'Background in blue.');
        console.clear()
        
        expect(logger.lastCommand).toBe('\x1b[44mBackground in blue.\x1b[0m');
    })

    test('Background in magenta.', () => {
        logger.bgColorLog('magenta', 'Background in magenta.');
        console.clear()
        
        expect(logger.lastCommand).toBe('\x1b[45mBackground in magenta.\x1b[0m');
    })

    test('Background in cyan.', () => {
        logger.bgColorLog('cyan', 'Background in cyan.');
        console.clear()
        
        expect(logger.lastCommand).toBe('\x1b[46mBackground in cyan.\x1b[0m');
    })

    test('Background in white.', () => {
        logger.bgColorLog('white', 'Background in white.');
        console.clear()
        
        expect(logger.lastCommand).toBe('\x1b[47mBackground in white.\x1b[0m');
    })

    test('Bold, blue', () => {
        logger.bgColorLog('blue', 'Bold, blue', {
            bold: true,
            underscore: false,
        });
        console.clear()
        
        expect(logger.lastCommand).toBe('\x1b[1m\x1b[44mBold, blue\x1b[0m');
    })

    test('Bold, dim, underscore, reverse', () => {
        logger.bgColorLog('blue', 'Bold, dim, underscore, reverse', {
            bold: true,
            dim: true,
            underscore: true,
            reverse: true,
        });
        console.clear()
        
        expect(logger.lastCommand).toBe('\x1b[1m\x1b[2m\x1b[4m\x1b[7m\x1b[44mBold, dim, underscore, reverse\x1b[0m');
    })

    test('Bold, underscore, blue.', () => {
        logger.bgColorLog('blue', 'Bold, underscore, blue.', {
            bold: true,
            dim: false,
            underscore: true,
            reverse: false,
        });
        console.clear()
        
        expect(logger.lastCommand).toBe('\x1b[1m\x1b[4m\x1b[44mBold, underscore, blue.\x1b[0m');
    })
})