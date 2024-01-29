import { Stream } from "stream";
declare namespace types {
    export type LEVEL = "debug" | "info" | "warn" | "error" | "disable" | "success";

    export type SETTING = "bold" | "italic" | "dim" | "underscore" | "reverse" | "strikethrough";

    export type COLOR = "black" | "red" | "green" | "yellow" | "blue" | "magenta" | "cyan" | "white";
}

type ticketObject = {
    font?: types.COLOR,
    bg?: types.COLOR,
}

type settingObject = {
    [key in types.SETTING]?: boolean;
};

declare class Logger {
    command: string;
    lastCommand: string;
    level: any;
    noColor: boolean;

    setLevel(level: types.LEVEL): void;

    createNamedLogger(name: string): Logger;

    setLogStream(stream: Stream): Logger;

    setLevelNoColor(): void;

    setLevelColor(): void;

    isLevelValid(level: types.LEVEL): boolean;

    isAllowedLevel(level: types.LEVEL): boolean;

    checkSetting(setting: settingObject): string;

    joint(): Logger;

    append(...args: any[]): Logger;

    reset(): Logger;

    setDate(callback: Function): void;

    getDate(): string;
    
    color(ticket: types.COLOR): Logger;
    
    bgColor(ticket: types.COLOR): Logger;
    
    bold(): Logger;
    
    dim(): Logger;
    
    underscore(): Logger;
    
    strikethrough(): Logger;
    
    reverse(): Logger;
    
    italic(): Logger;
    
    fontColorLog(ticket: types.COLOR, text: string, setting?: settingObject): void;
    
    bgColorLog(ticket: types.COLOR, text: string, setting?: settingObject): void;
    
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