const CONFIG = {
    SYSTEM: {
        reset: "\x1b[0m",
        bright: "\x1b[1m",
        dim: "\x1b[2m",
        underscore: "\x1b[4m",
        blink: "\x1b[5m",
        reverse: "\x1b[7m",
        hidden: "\x1b[8m",
        backToUpLine: "\x1b[2A"
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

    }

    fontColor(ticket, text) {
        if (ticket in CONFIG.FONT) {
            console.log(`${CONFIG.FONT[ticket]}%s${CONFIG.SYSTEM.reset}`, text);
        } else {
            console.log(text);
            this.warn("Font color not found! Use the default.")
        }
    }

    bgColor(ticket, text) {
        if (ticket in CONFIG.BACKGROUND) {
            console.log(`${CONFIG.BACKGROUND[ticket]}%s${CONFIG.SYSTEM.reset}`, text);
        } else {
            console.log(text);
            this.warn("Background color not found! Use the default.")
        }
    }

    setFontColor(ticket) {
        if (ticket in CONFIG.FONT) {
            console.log(CONFIG.FONT[ticket]);
            console.log(CONFIG.SYSTEM.backToUpLine);
        } else {
            this.warn("Font color not found! Use the default.")
        }
    }

    setBgColor(ticket) {
        if (ticket in CONFIG.BACKGROUND) {
            console.log(CONFIG.BACKGROUND[ticket]);
            console.log(CONFIG.SYSTEM.backToUpLine);
        } else {
            this.warn("Background color not found! Setting not change!")
        }
    }

    log(text) {
        console.log(text);
    }

    reset() {
        console.log(CONFIG.SYSTEM.reset);
        console.log(CONFIG.SYSTEM.backToUpLine);
    }

    error(text) {
        this.fontColor('red', `Error: ${text}`);
    }

    warn(text) {
        this.fontColor('yellow', `Warning: ${text}`);
    }

    info(text) {
        this.fontColor('green', `Info: ${text}`);
    }

    degug(text) {
        this.fontColor('cyan', `Debug: ${text}`);
    }
}

module.exports = Logger;