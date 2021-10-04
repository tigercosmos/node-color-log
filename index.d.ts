type level = "debug" | "info" | "warn" | "error" | "disable";

type setting = "bold" | "italic" | "dim" | "underscore" | "reverse" | "strikethrough";

type color = "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white";

type ticketObject = {
    font?: color,
    bg?: color,
}

type settingObject = {
    [key in setting]?: boolean;
};

declare class Logger {
    command: string;
    lastCommand: string;
    level: any;
    noColor: boolean;

    setLevel(level: level): void;

    setLevelNoColor(): void;

    setLevelColor(): void;

    isLevelValid(level: level): boolean;

    isAllowedLevel(level: level): boolean;

    checkSetting(setting: settingObject): string;

    joint(): Logger;

    setDate(callback: Function): void;

    getDate(): string;
    
    color(ticket: color): Logger;
    
    bgColor(ticket: color): Logger;
    
    bold(): Logger;
    
    dim(): Logger;
    
    underscore(): Logger;
    
    strikethrough(): Logger;
    
    reverse(): Logger;
    
    italic(): Logger;
    
    fontColorLog(ticket: color, text: string, setting?: settingObject): void;
    
    bgColorLog(ticket: color, text: string, setting?: settingObject): void;
    
    colorLog(ticketObj: ticketObject, text: string, setting?: settingObject): void;

    log(...args: any[]): Logger;

    error(...args: any[]): void;

    warn(...args: any[]): void;

    info(...args: any[]): void;

    debug(...args: any[]): void;
}

declare const logger: Logger;
export = logger;
