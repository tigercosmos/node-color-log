const logger = require('../../index');

logger._customizedConsole.error = () => {}

describe('Common Log Chain', () => {
    test('blue and underscore.', () => {
        logger.color('blue').underscore().log('blue and underscore.');
        
        expect(logger.lastCommand, 'Message mismatch').toBe('\x1b[34m\x1b[4mblue and underscore.\x1b[0m');
    });

    test('blue and reverse.', () => {
        logger.color('blue').reverse().log('blue and reverse.');
        
        expect(logger.lastCommand, 'Message mismatch').toBe('\x1b[34m\x1b[7mblue and reverse.\x1b[0m');
    });

    test('blue and dim.', () => {
        logger.color('blue').dim().log('blue and dim.');
        
        expect(logger.lastCommand, 'Message mismatch').toBe('\x1b[34m\x1b[2mblue and dim.\x1b[0m');
    });

    test('blue and italic.', () => {
        logger.color('blue').italic().log('blue and italic.');
        
        expect(logger.lastCommand, 'Message mismatch').toBe('\x1b[34m\x1b[3mblue and italic.\x1b[0m');
    });

    test('blue and strikethrough.', () => {
        logger.color('blue').strikethrough().log('blue and strikethrough.');
        
        expect(logger.lastCommand, 'Message mismatch').toBe('\x1b[34m\x1b[9mblue and strikethrough.\x1b[0m');
    });

    test('Red and Bold.', () => {
        logger.color('red').bold().log('Red and Bold.');
        
        expect(logger.lastCommand, 'Message mismatch').toBe('\x1b[31m\x1b[1mRed and Bold.\x1b[0m');
    });

    test('blue, yellow, bold, italic.', () => {
        logger.color('blue').bgColor('yellow').bold().italic().log('blue, yellow, bold, italic.');
        
        expect(logger.lastCommand, 'Message mismatch').toBe('\x1b[34m\x1b[43m\x1b[1m\x1b[3mblue, yellow, bold, italic.\x1b[0m');
    });

    test('this should be normal.', () => {
        logger.log('this should be normal.')
        
        expect(logger.lastCommand, 'Message mismatch').toBe('this should be normal.\x1b[0m');
    });

    test('bold, italic, blue, yellow.', () => {
        logger.bold().italic().color('blue').bgColor('yellow').log('bold, italic, blue, yellow.');
        
        expect(logger.lastCommand, 'Message mismatch').toBe('\x1b[1m\x1b[3m\x1b[34m\x1b[43mbold, italic, blue, yellow.\x1b[0m');
    });
});

// deprecated joint
describe('Joint', () => {
    test('1 joint', () => {
        logger
            .color('yellow').log('font in yellow,')
            .joint().bgColor('red').log('background in red,');
        
        expect(logger.lastCommand, 'Message mismatch').toBe('\x1b[1A\x1b[33mfont in yellow,\x1b[0m\x1b[41mbackground in red,\x1b[0m');
    });
    
    test('2 joint', () => {
        logger
            .color('yellow').log('font in yellow,').joint()
            .bgColor('red').log('background in red,').joint()
            .color('yellow').log('font in yellow');
        
        expect(logger.lastCommand, 'Message mismatch').toBe('\x1b[1A\x1b[33mfont in yellow,\x1b[0m\x1b[41mbackground in red,\x1b[0m\x1b[33mfont in yellow\x1b[0m');
    });
})

describe('Append', () => {
    test('1 append', () => {
        logger.color('yellow').append('font in yellow,').bgColor('red').log('background in red');
        
        expect(logger.lastCommand, 'Message mismatch').toBe('\x1b[33mfont in yellow,\x1b[41mbackground in red\x1b[0m');
    })

    test('2 append', () => {
        logger.color('yellow').append('font in yellow,')
            .bgColor('red').append('background in red,').reset()
            .color('yellow').log('font in yellow');
        
        expect(logger.lastCommand, 'Message mismatch').toBe('\x1b[33mfont in yellow,\x1b[41mbackground in red,\x1b[0m\x1b[33mfont in yellow\x1b[0m');
    })
})