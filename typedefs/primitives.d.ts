declare namespace color {
    export const black: color;
    export const blue: color;
    export const clear: color;
    export const cyan: color;
    export const gray: color;
    export const green: color;
    export const magenta: color;
    export const red: color;
    export const white: color;
    export const yellow: color;
}

type color = {
    A: number,
    B: number,
    G: number,
    R: number
}

declare function vec2(this: void, x: number, y: number): vec2

type vec2 = {
    X: number,
    Y: number,
    /**
     * virtual property to prevent accidential instantiation through object literals
     */
    __brand: never
}

declare function vec3(this: void, x: number, y: number, z: number): vec3

type vec3 = {
    X: number,
    Y: number,
    Z: number,
    /**
     * virtual property to prevent accidential instantiation through object literals
     */
    __brand: never
}

type AnsiBlack = 30;
type AnsiDarkRed = 31;
type AnsiDarkGreen = 32;
type AnsiDarkYellow = 33;
type AnsiDarkBlue = 34;
type AnsiDarkMagenta = 35;
type AnsiDarkCyan = 36;
type AnsiLightGray = 37;
type AnsiDarkGray = 90;
type AnsiRed = 91;
type AnsiGreen = 92;
type AnsiOrange = 93;
type AnsiBlue = 94;
type AnsiMagenta = 95;
type AnsiCyan = 96;
type AnsiWhite = 97;

type ANSIColors = AnsiBlack | AnsiDarkRed | AnsiDarkGreen | AnsiDarkYellow | AnsiDarkBlue | AnsiDarkMagenta | AnsiDarkCyan | AnsiLightGray | AnsiDarkGray | AnsiRed | AnsiGreen | AnsiOrange | AnsiBlue | AnsiMagenta | AnsiCyan | AnsiWhite;
