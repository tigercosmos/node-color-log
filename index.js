const CONFIG = {
        SYSTEM: {
            reset: "\x1b[0m",
            bold: "\x1b[1m",
            dim: "\x1b[2m",
            italic: "\x1b[3m",
            underscore: "\x1b[4m",
            reverse: "\x1b[7m",
            strikethrough: "\x1b[9m",
            backoneline: "\x1b[1A",
            cleanthisline: "\x1b[K"
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
    },
    // Sequence of levels is important.
    LEVELS = ["info", "debug", "warn", "error"];

class Logger {
    constructor() {
        // Current command
        this.command = '';
        // Last line
        this.lastCommand = '';
    }

    setLevel(level) {
        if (this.isLevelValid(level)) {
            this.level = level;
        } else {
            throw "Level you are trying to set is invalid";
        }

    }

    isLevelValid(level) {
        return LEVELS.includes(level);
    }

    isAllowedLevel(level) {
        return this.level ? LEVELS.indexOf(this.level) <= LEVELS.indexOf(level) : true
    }

    log(text) {
        this.command += text;
        this.command += CONFIG.SYSTEM.reset;
        console.log(this.command);
        // Save last command if we need to use for joint
        this.lastCommand = this.command;
        this.command = '';
        return this;
    }

    joint() {
        // Clear the last line
        console.log(CONFIG.SYSTEM.backoneline + CONFIG.SYSTEM.cleanthisline);

        // Reset the command to let it joint the next
        // And print from the position of last line
        this.command = '';

        // if joint more than twice, we should clean the previous
        // backline command, since we should only do it for the 
        // current time.
        this.lastCommand = this.lastCommand.replace(CONFIG.SYSTEM.backoneline, "");

        // back to the last line
        this.command += CONFIG.SYSTEM.backoneline;

        this.command += this.lastCommand;
        return this;
    }

    color(ticket) {
        if (ticket in CONFIG.FONT) {
            this.command += CONFIG.FONT[ticket];
        } else {
            this.warn("node-color-log: Font color not found! Use the default.")
        }
        return this;
    }

    bgColor(ticket) {
        if (ticket in CONFIG.BACKGROUND) {
            this.command += CONFIG.BACKGROUND[ticket];
        } else {
            this.warn("node-color-log: Background color not found! Use the default.")
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
            this.warn("node-color-log: Font color not found! Use the default.")
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
            this.warn("node-color-log: Background color not found! Use the default.")
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
            this.warn("node-color-log: Font color not found! Use the default.")
        }
        if (ticketObj.bg in CONFIG.BACKGROUND) {
            command += CONFIG.BACKGROUND[ticketObj.bg]
        } else {
            this.warn("node-color-log: Background color not found! Use the default.")
        }
        command += '%s';
        command += CONFIG.SYSTEM.reset;
        console.log(command, text);
    }

    error(text) {
        if (this.isAllowedLevel("error")) {
            const d = (new Date()).toISOString();
            this.log(d + " ").joint()
                .bgColor('red').log('[ERROR]').joint()
                .color('red').log(" " + text);

        }
    }

    warn(text) {
        if (this.isAllowedLevel("warn")) {
            const d = (new Date()).toISOString();
            this.log(d + " ").joint()
                .bgColor('yellow').log('[WARN]').joint()
                .color('yellow').log(" " + text);
        }
    }

    info(text) {
        if (this.isAllowedLevel("info")) {
            const d = (new Date()).toISOString();
            this.log(d + " ").joint()
                .bgColor('green').log('[INFO]').joint()
                .color('green').log(" " + text);
        }
    }

    debug(text) {
        if (this.isAllowedLevel("debug")) {
            const d = (new Date()).toISOString();
            this.log(d + " ").joint()
                .bgColor('cyan').log('[DEBUG]').joint()
                .color('cyan').log(" " + text);
        }
    }

    checkSetting(setting) {
        const validSetting = ['bold', 'italic', 'dim', 'underscore', 'reverse', 'strikethrough'];
        let command = '';
        for (const item in setting) {
            if (validSetting.indexOf(item) !== -1) {
                if (setting[item] === true) {
                    command += CONFIG.SYSTEM[item];
                } else if (setting[item] !== false) {
                    this.warn(`node-color-log: The value ${item} should be boolean.`)
                }
            } else {
                this.warn(`node-color-log: ${item} is not valid in setting.`)
            }
        }
        return command;
    }
}

const logger = new Logger();
module.exports = logger;