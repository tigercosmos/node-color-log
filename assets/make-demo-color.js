const logger = require('../index');

logger.fontColorLog('red', "logger.fontColorLog('red', message)");
logger.fontColorLog(
    'blue',
    "logger.fontColorLog('blue', message, '{bold: true,italic: true}')", {
        bold: true,
        italic: true
    });

logger.bgColorLog('red', "logger.bgColorLog('red', message)");
logger.bgColorLog(
    'magenta',
    "logger.bgColorLog('magenta', message, '{underscore: true, dim: true}')", {
        underscore: true,
        dim: true
    });

logger.colorLog({
    font: 'blue',
    bg: 'white'
}, "logger.colorLog({font: 'red',bg: 'white'}, message");
logger.colorLog({
    font: 'blue',
    bg: 'white'
}, "logger.colorLog({font: 'red',bg: 'white'}, message, {reverse: true,strikethrough: true})", {
    reverse: true,
    strikethrough: true
});

