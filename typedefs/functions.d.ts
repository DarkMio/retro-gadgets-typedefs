
/*
 * Global Methods
 */

declare function Color(r: number, g: number, b: number): color
declare function ColorRGBA(r: number, g: number, b: number, a: number): color
declare function ColorHSV(h: number, s: number, v: number): color

declare function log(message: string): void
declare function logWarning(message: string): void
declare function logError(message: string): void

declare function write(text: string): void
declare function writeLn(text: string): void

declare function setFgColor(colorId: ANSIColors): void
declare function setBgColor(colorId: ANSIColors): void
declare function resetFgColor(): void
declare function resetBgColor(): void
declare function resetColors(): void

declare function setCurorPos(column: number, line: number): void
declare function setCurorX(column: number): void
declare function setCursorY(line: number): void
declare function moveCursorX(deltaColumn: number): void
declare function moveCursorY(deltaLine: number): void
declare function saveCurosorPos(): void
declare function restoreCursorPos(): void

declare function clear(): void
declare function clearToEndLine(): void

/*
 * Desk Methods
 */
declare const desk: Desk

/*
 * Undocumented
 */

type MultitoolConnector = { }

type Gadget = {
    MultitoolConnector: MultitoolConnector,
    PowerButton: PowerButton,
    // the following can be any number of components with their name and number attached
    CPU0?: CPU,
    Led0?: Led,
    Switch0?: Switch


}

declare const gdt: Gadget