/**
 * Imports
 */
import { IntRange } from './helpers';
import { color, ANSIColors, Desk, PowerButton } from './types';

/*
 * Global Methods
 */
declare global {
	/**
	 * Compose and returns a RGB Color object. Values for the 3 channels are always expressed in the range 0-255.
	 */
	function Color(
		this: void,
		r: IntRange<0, 256>,
		g: IntRange<0, 256>,
		b: IntRange<0, 256>,
	): color;
	/**
	 * Compose and returns a RGB Color object, with Alpha. Values for the 4 channels are always expressed in the range 0-255. Alpha 0 is transparent
	 */
	function ColorRGBA(
		this: void,
		r: IntRange<0, 256>,
		g: IntRange<0, 256>,
		b: IntRange<0, 256>,
		a: IntRange<0, 256>,
	): color;
	/**
	 * Compose and returns a RGB Color Object, expressing it in HSV values.
	 * @param h [0-360]
	 * @param s [0-100]
	 * @param v [0-100]
	 */
	function ColorHSV(
		this: void,
		h: IntRange<0, 361>,
		s: IntRange<0, 101>,
		v: IntRange<0, 101>,
	): color;

	function log(this: void, message: string): void;
	function logWarning(this: void, message: string): void;
	function logError(this: void, message: string): void;

	function write(this: void, text: string): void;
	function writeLn(this: void, text: string): void;

	/**
	 * Use ANSI Colors
	 */
	function setFgColor(this: void, colorId: ANSIColors): void;
	/**
	 * Use ANSI colors
	 */
	function setBgColor(this: void, colorId: ANSIColors): void;
	function resetFgColor(this: void): void;
	function resetBgColor(this: void): void;
	function resetColors(this: void): void;

	function setCurorPos(this: void, column: number, line: number): void;
	function setCurorX(this: void, column: number): void;
	function setCursorY(this: void, line: number): void;
	function moveCursorX(this: void, deltaColumn: number): void;
	function moveCursorY(this: void, deltaLine: number): void;
	function saveCurosorPos(this: void): void;
	function restoreCursorPos(this: void): void;

	function clear(this: void): void;
	function clearToEndLine(this: void): void;

	/*
	 * Desk Methods
	 */
	const desk: Desk;

	/**
	 * Runtime functions
	 */
	let update: () => void;
}

/*
 * Undocumented
 */

type MultitoolConnector = {};

type Gadget = {
	MultitoolConnector: MultitoolConnector;
	PowerButton: PowerButton;
	// the following can be any number of components with their name and number attached
	[k: string]: any;
};
