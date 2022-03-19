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
};

// Sequence of levels is important.
const LEVELS = ["success", "debug", "info", "warn", "error", "disable"];

class Logger {
    constructor() {
        // Current command
        this.command = '';
        // Last line
        this.lastCommand = '';

        // set level from env
        const level = process.env.LOGGER;
        if (this.isLevelValid(level)) {
            this.level = level;
        }

        this.noColor = false;

        this._getDate = () => (new Date()).toISOString();
    }

    setLevel(level) {
        if (this.isLevelValid(level)) {
            this.level = level;
        } else {
            throw "Level you are trying to set is invalid";
        }

    }

    setLevelNoColor() {
        this.noColor = true;
    }

    setLevelColor() {
        this.noColor = false;
    }

    isLevelValid(level) {
        return LEVELS.includes(level);
    }

    isAllowedLevel(level) {
        return this.level ? LEVELS.indexOf(this.level) <= LEVELS.indexOf(level) : true
    }

    log(...args) {

        for (const idx in args) {
            const arg = args[idx];
            if (typeof arg === "string") {
                this.command += arg;
            } else {
                this.command += JSON.stringify(arg);
            }
            if (args.length > 1 && idx < args.length - 1) {
                this.command += " ";
            }
        }

        if (!this.noColor) {
            this.command += CONFIG.SYSTEM.reset;
        }
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

    setDate(callback) {
        this._getDate = callback;
    }

    getDate() {
        return this._getDate();
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
        command += text;

        command += CONFIG.SYSTEM.reset;
        console.log(command);
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
        command += text;

        command += CONFIG.SYSTEM.reset;
        console.log(command);
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

        command += text;

        command += CONFIG.SYSTEM.reset;
        console.log(command);
    }

    error(...args) {
        if (!this.isAllowedLevel("error"))
            return;

        if (this.noColor) {
            const d = this.getDate();
            this.log(d, " [ERROR] ", ...args);
        } else {
            const d = this.getDate();
            this.log(d + " ").joint()
                .bgColor('red').log('[ERROR]').joint()
                .log(" ").joint()
                .color('red').log(...args);
        }
    }

    warn(...args) {
        if (!this.isAllowedLevel("warn"))
            return;

        if (this.noColor) {
            const d = this.getDate();
            this.log(d, " [WARN] ", ...args);
        } else {
            const d = this.getDate();
            this.log(d + " ").joint()
                .bgColor('yellow').color('black').log('[WARN]').joint()
                .log(" ").joint()
                .color('yellow').log(...args);
        }
    }

    info(...args) {
        if (!this.isAllowedLevel("info"))
            return;

        if (this.noColor) {
            const d = this.getDate();
            this.log(d, " [INFO] ", ...args);
        } else {
            const d = this.getDate();
            this.log(d + " ").joint()
                .bgColor('green').color('black').log('[INFO]').joint()
                .log(" ").joint()
                .color('green').log(...args);
        }
    }

    debug(...args) {
        if (!this.isAllowedLevel("debug"))
            return;

        if (this.noColor) {
            const d = this.getDate();
            this.log(d, " [DEBUG] ", ...args);
        } else {
            const d = this.getDate();
            this.log(d + " ").joint()
                .bgColor('cyan').color('black').log("[DEBUG]").joint()
                .log(' ').joint()
                .color('cyan')
                .log(...args);
        }
    }

    success(...args) {
        if (!this.isAllowedLevel("success"))
            return;

        if (this.noColor) {
            const d = this.getDate();
            this.log(d, " [SUCCESS] ", ...args);
        } else {
            const d = this.getDate();
            this.log(d + " ").joint()
                .bgColor('green').color('black').log("[SUCCESS]").joint()
                .log(' ').joint()
                .color('green')
                .log(...args);
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
