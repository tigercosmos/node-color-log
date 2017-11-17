const CONFIG = {
    SYSTEM: {
        reset: "\x1b[0m",
        bold: "\x1b[1m",
        dim: "\x1b[2m",
        italic: "\x1b[3m",
        underscore: "\x1b[4m",
        reverse: "\x1b[7m",
        strikethrough: "\x1b[9m",
    },
    FONT: {
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
    },
    BACKGROUND: {
        black: "\x1b[40m",
        red: "\x1b[41m",
        green: "\x1b[42m",
        yellow: "\x1b[43m",
        blue: "\x1b[44m",
        magenta: "\x1b[45m",
        cyan: "\x1b[46m",
        white: "\x1b[47m"
    }
}

class Logger {
    constructor() {
        this.initSetting();
    }

    initSetting() {
        this.command = '';
    }

    log(text) {
        let command = this.command;
        command += "%s";
        command += CONFIG.SYSTEM.reset;
        console.log(command, text);
        this.command = '';
    }

    color(ticket) {
        if (ticket in CONFIG.FONT) {
            this.command += CONFIG.FONT[ticket];
        } else {
            this.warn("Font color not found! Use the default.")
        }
        return this;
    }

    bgColor(ticket) {
        if (ticket in CONFIG.BACKGROUND) {
            this.command += CONFIG.BACKGROUND[ticket];
        } else {
            this.warn("Background color not found! Use the default.")
        }
        return this;
    }

    bold() {
        this.command += CONFIG.SYSTEM.bold;
        return this;
    }

    dim() {
        this.command += CONFIG.SYSTEM.dim;
        return this;
    }

    underscore() {
        this.command += CONFIG.SYSTEM.underscore;
        return this;
    }

    strikethrough() {
        this.command += CONFIG.SYSTEM.strikethrough;
        return this;
    }

    reverse() {
        this.command += CONFIG.SYSTEM.reverse;
        return this;
    }

    italic() {
        this.command += CONFIG.SYSTEM.italic;
        return this;
    }

    fontColorLog(ticket, text, setting) {
        let command = '';
        if (setting) {
            command += this.checkSetting(setting);
        }
        if (ticket in CONFIG.FONT) {
            command += CONFIG.FONT[ticket];
        } else {
            this.warn("Font color not found! Use the default.")
        }
        command += '%s';
        command += CONFIG.SYSTEM.reset;
        console.log(command, text);
    }

    bgColorLog(ticket, text, setting) {
        let command = '';
        if (setting) {
            command += this.checkSetting(setting);
        }
        if (ticket in CONFIG.BACKGROUND) {
            command += CONFIG.BACKGROUND[ticket];
        } else {
            this.warn("Background color not found! Use the default.")
        }
        command += '%s';
        command += CONFIG.SYSTEM.reset;
        console.log(command, text);
    }

    colorLog(ticketObj, text, setting) {
        let command = '';
        if (setting) {
            command += this.checkSetting(setting);
        }
        if (ticketObj.font in CONFIG.FONT) {
            command += CONFIG.FONT[ticketObj.font];
        } else {
            this.warn("Font color not found! Use the default.")
        }
        if (ticketObj.bg in CONFIG.BACKGROUND) {
            command += CONFIG.BACKGROUND[ticketObj.bg]
        } else {
            this.warn("Background color not found! Use the default.")
        }
        command += '%s';
        command += CONFIG.SYSTEM.reset;
        console.log(command, text);
    }

    error(text) {
        this.fontColorLog('red', `ERROR: ${text}`);
    }

    warn(text) {
        this.fontColorLog('yellow', `WARN: ${text}`);
    }

    info(text) {
        this.fontColorLog('green', `INFO: ${text}`);
    }

    debug(text) {
        this.fontColorLog('cyan', `DEBUG: ${text}`);
    }

    checkSetting(setting) {
        const validSetting = ['bold', 'italic', 'dim', 'underscore', 'reverse', 'strikethrough'];
        let command = '';
        for (const item in setting) {
            if (validSetting.indexOf(item) !== -1) {
                if (setting[item] === true) {
                    command += CONFIG.SYSTEM[item];
                } else if (setting[item] !== false) {
                    this.warn(`The value ${item} should be boolean.`)
                }
            } else {
                this.warn(`${item} is not valid in setting.`)
            }
        }
        return command;
    }
}

module.exports = Logger;
