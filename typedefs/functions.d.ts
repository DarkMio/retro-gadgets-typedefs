/**
 * Imports
 */
import { IntRange } from "./helpers";
import { color, ANSIColors, Desk, PowerButton } from "./types";

/*
 * Global Methods
 */

/**
 * Compose and returns a RGB Color object. Values for the 3 channels are always expressed in the range 0-255.
 */
declare function Color(this: void, r: IntRange<0, 255>, g: IntRange<0, 255>, b: IntRange<0, 255>): color
/**
 * Compose and returns a RGB Color object, with Alpha. Values for the 4 channels are always expressed in the range 0-255. Alpha 0 is transparent
 */
declare function ColorRGBA(this: void, r: IntRange<0, 255>, g: IntRange<0, 255>, b: IntRange<0, 255>, a: IntRange<0, 255>): color
/**
 * Compose and returns a RGB Color Object, expressing it in HSV values.
 * @param h [0-360] 
 * @param s [0-100]
 * @param v [0-100]
 */
declare function ColorHSV(this: void, h: IntRange<0, 360>, s: IntRange<0, 100>, v: IntRange<0, 100>): color


declare function log(this: void, message: string): void
declare function logWarning(this: void, message: string): void
declare function logError(this: void, message: string): void

declare function write(this: void, text: string): void
declare function writeLn(this: void, text: string): void

/**
 * Use ANSI Colors
 */
declare function setFgColor(this: void, colorId: ANSIColors): void
/**
 * Use ANSI colors
 */
declare function setBgColor(this: void, colorId: ANSIColors): void
declare function resetFgColor(this: void): void
declare function resetBgColor(this: void): void
declare function resetColors(this: void): void

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

/**
 * Runtime functions
 */
declare let update: () => void;

/*
 * Undocumented
 */

type MultitoolConnector = { }

type Gadget = {
    MultitoolConnector: MultitoolConnector,
    PowerButton: PowerButton,
    // the following can be any number of components with their name and number attached
    [k: string]: any
}