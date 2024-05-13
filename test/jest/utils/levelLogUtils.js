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

module.exports = {
    getLevelLogMessage,
    createLevelLogMessage
}