/*
 * Global Methods
 */

declare function Color(this: void, r: number, g: number, b: number): color
declare function ColorRGBA(this: void, r: number, g: number, b: number, a: number): color
declare function ColorHSV(this: void, h: number, s: number, v: number): color

declare function log(this: void, message: string): void
declare function logWarning(this: void, message: string): void
declare function logError(this: void, message: string): void

declare function write(this: void, text: string): void
declare function writeLn(this: void, text: string): void

declare function setFgColor(this: void, colorId: ANSIColors): void
declare function setBgColor(this: void, colorId: ANSIColors): void
declare function resetFgColor(this: void, ): void
declare function resetBgColor(this: void, ): void
declare function resetColors(this: void, ): void

declare function setCurorPos(this: void, column: number, line: number): void
declare function setCurorX(this: void, column: number): void
declare function setCursorY(this: void, line: number): void
declare function moveCursorX(this: void, deltaColumn: number): void
declare function moveCursorY(this: void, deltaLine: number): void
declare function saveCurosorPos(this: void): void
declare function restoreCursorPos(this: void): void

declare function clear(this: void): void
declare function clearToEndLine(this: void): void

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