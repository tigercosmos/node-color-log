export type LEVEL = "debug" | "info" | "warn" | "error" | "disable" | "success";

export type SETTING = "bold" | "italic" | "dim" | "underscore" | "reverse" | "strikethrough";

export type COLOR = "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white";

type ticketObject = {
    font?: COLOR,
    bg?: COLOR,
}

type settingObject = {
    [key in SETTING]?: boolean;
};

declare class Logger {
    command: string;
    lastCommand: string;
    level: any;
    noColor: boolean;

    setLevel(level: LEVEL): void;

    createNamedLogger(name: string): Logger;

    setLevelNoColor(): void;

    setLevelColor(): void;

    isLevelValid(level: LEVEL): boolean;

    isAllowedLevel(level: LEVEL): boolean;

    checkSetting(setting: settingObject): string;

    joint(): Logger;

    setDate(callback: Function): void;

    getDate(): string;
    
    color(ticket: COLOR): Logger;
    
    bgColor(ticket: COLOR): Logger;
    
    bold(): Logger;
    
    dim(): Logger;
    
    underscore(): Logger;
    
    strikethrough(): Logger;
    
    reverse(): Logger;
    
    italic(): Logger;
    
    fontColorLog(ticket: COLOR, text: string, setting?: settingObject): void;
    
    bgColorLog(ticket: COLOR, text: string, setting?: settingObject): void;
    
    colorLog(ticketObj: ticketObject, text: string, setting?: settingObject): void;

    log(...args: any[]): Logger;

    error(...args: any[]): void;

    warn(...args: any[]): void;

    info(...args: any[]): void;

    debug(...args: any[]): void;

    success(...args: any[]): void;
}

declare const logger: Logger;
export = logger;
