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
    constructor(name) {
        // Current command
        this.command = '';
        // Last line
        this.lastCommand = '';

        this.name = name || ""

        // set level from env
        const level = typeof process !== 'undefined' ? process.env.LOGGER : undefined;
        if (this.isLevelValid(level)) {
            this.level = level;
        }

        this.noColor = false;

        this._getDate = () => (new Date()).toISOString();

        this._customizedConsole = console;

        this._enableFileAndLine = {
            enable: false,
            isShortFile: false,
        };
    }

    createNamedLogger(name) {
        return new Logger(name)
    }

    setLevel(level) {
        if (this.isLevelValid(level)) {
            this.level = level;
        } else {
            throw "Level you are trying to set is invalid";
        }

    }

    setLogStream(newStream) {
        if (newStream.writable) {
            this._customizedConsole = new console.Console(newStream);
        } else {
            throw "invalid writable stream object";
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

    enableFileAndLine(enable, isShortFile = false) {
        if (typeof enable === 'boolean') {
            this._enableFileAndLine.enable = enable;
            this._enableFileAndLine.isShortFile = isShortFile;
        } else {
            console.error("node-color-log warning: enableFileAndLine should be a boolean value.");
        }
    }

    log(...args) {
        this.append(...args);
        if (!this.noColor) {
            this.command += CONFIG.SYSTEM.reset;
        }
        this._print(this.command);
        // Save last command if we need to use for joint
        this.lastCommand = this.command;
        this.command = '';
        return this;
    }

    // deprecated
    joint() {
        console.error("node-color-log warning: `joint` is deprecated, please use `append`");

        // Clear the last line
        this._print(CONFIG.SYSTEM.backoneline + CONFIG.SYSTEM.cleanthisline);

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

    getPrefix() {
        let prefix = `${this._getDate()}`;

        if (this.name) {
            prefix += ` [${this.name}]`;
        }
        if (this._enableFileAndLine.enable) {
            const fileAndLine = getFileAndLine(this._enableFileAndLine.isShortFile);
            if (fileAndLine) {
                prefix += `[${fileAndLine}]`;
            }
        }

        return prefix;
    }

    color(ticket) {
        if (ticket in CONFIG.FONT) {
            this.command += CONFIG.FONT[ticket];
        } else {
            console.error("node-color-log warning: Font color not found! Use the default.")
        }
        return this;
    }

    bgColor(ticket) {
        if (ticket in CONFIG.BACKGROUND) {
            this.command += CONFIG.BACKGROUND[ticket];
        } else {
            console.error("node-color-log warning: Background color not found! Use the default.")
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
            console.error("node-color-log warning: Font color not found! Use the default.")
        }
        command += text;

        command += CONFIG.SYSTEM.reset;
        this.lastCommand = command;
        this._print(command);
    }

    bgColorLog(ticket, text, setting) {
        let command = '';
        if (setting) {
            command += this.checkSetting(setting);
        }
        if (ticket in CONFIG.BACKGROUND) {
            command += CONFIG.BACKGROUND[ticket];
        } else {
            console.error("node-color-log warning: Background color not found! Use the default.")
        }
        command += text;

        command += CONFIG.SYSTEM.reset;
        this.lastCommand = command;
        this._print(command);
    }

    colorLog(ticketObj, text, setting) {
        let command = '';
        if (setting) {
            command += this.checkSetting(setting);
        }
        if (ticketObj.font in CONFIG.FONT) {
            command += CONFIG.FONT[ticketObj.font];
        } else {
            console.error("node-color-log warning: Font color not found! Use the default.")
        }
        if (ticketObj.bg in CONFIG.BACKGROUND) {
            command += CONFIG.BACKGROUND[ticketObj.bg]
        } else {
            console.error("node-color-log warning: Background color not found! Use the default.")
        }

        command += text;

        command += CONFIG.SYSTEM.reset;
        this.lastCommand = command;
        this._print(command);
    }

    error(...args) {
        if (!this.isAllowedLevel("error"))
            return;

        if (this.noColor) {
            const d = this.getPrefix();
            this.log(d, " [ERROR] ", ...args);
        } else {
            const d = this.getPrefix();
            this.append(d + " ")
                .bgColor('red').append('[ERROR]').reset()
                .append(" ")
                .color('red').log(...args);
        }
    }

    warn(...args) {
        if (!this.isAllowedLevel("warn"))
            return;

        if (this.noColor) {
            const d = this.getPrefix();
            this.log(d, " [WARN] ", ...args);
        } else {
            const d = this.getPrefix();
            this.append(d + " ")
                .bgColor('yellow').color('black').append('[WARN]').reset()
                .append(" ")
                .color('yellow').log(...args);
        }
    }

    info(...args) {
        if (!this.isAllowedLevel("info"))
            return;

        if (this.noColor) {
            const d = this.getPrefix();
            this.log(d, " [INFO] ", ...args);
        } else {
            const d = this.getPrefix();
            this.append(d + " ")
                .bgColor('green').color('black').append('[INFO]').reset()
                .append(" ")
                .color('green').log(...args);
        }
    }

    debug(...args) {
        if (!this.isAllowedLevel("debug"))
            return;

        if (this.noColor) {
            const d = this.getPrefix();
            this.log(d, " [DEBUG] ", ...args);
        } else {
            const d = this.getPrefix();
            this.append(d + " ")
                .bgColor('cyan').color('black').append("[DEBUG]").reset()
                .append(' ')
                .color('cyan')
                .log(...args);
        }
    }

    success(...args) {
        if (!this.isAllowedLevel("success"))
            return;

        if (this.noColor) {
            const d = this.getPrefix();
            this.log(d, " [SUCCESS] ", ...args);
        } else {
            const d = this.getPrefix();
            this.append(d + " ")
                .bgColor('green').color('black').append("[SUCCESS]").reset()
                .append(' ')
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
                    console.error(`node-color-log warning: The value ${item} should be boolean.`)
                }
            } else {
                console.error(`node-color-log warning: ${item} is not valid in setting.`)
            }
        }
        return command;
    }

    // helper function to output the the log to stream
    _print(...args) {
        this._customizedConsole.error(...args);
    }

    // helper function to append the command buffer
    append(...args) {
        for (const idx in args) {
            const arg = args[idx];
            if (typeof arg === "string") {
                this.command += arg;
            } else {
                try {
                    this.command += JSON.stringify(arg);
                } catch {
                    this.command += arg;
                }
            }
            if (args.length > 1 && idx < args.length - 1) {
                this.command += " ";
            }
        }
        return this;
    }

    reset() {
        this.command += CONFIG.SYSTEM.reset;
        return this;
    }
}

function getFileAndLine(isShortFile = false) {
    const e = new Error();
    const line = e.stack.split('\n')[2]; // 3rd line: caller

    // find ( and ) in the line from the end
    let start = line.lastIndexOf('(');
    let end = line.lastIndexOf(')');
    if (start === -1 || end === -1 || start >= end) {
        return '';
    }
    // Extract the file and line number
    const fileAndLine = line.substring(start + 1, end);

    if (isShortFile) {
        const fileName = fileAndLine.split('/').pop(); // Get the last part of the path
        return `${fileName}:${fileAndLine.split(':')[1]}`; // Return file name and line number
    }

    // Split by : to get the file path and line number
    const parts = fileAndLine.split(':');
    if (parts.length < 2) {
        return '';
    }
    // Return the file path and line number
    return `${parts[0]}:${parts[1]}`;
}

const logger = new Logger();
module.exports = logger;