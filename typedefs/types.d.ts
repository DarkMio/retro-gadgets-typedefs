/// <reference path="functions.d.ts">
/// <reference path="helpers.d.ts">

/*
 * Globals
 */

import { FixedSizeArray, ReadOnlyFixedSizeArray } from "./helpers";

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
}

declare function vec3(this: void, x: number, y: number, z: number): vec3

type vec3 = {
    X: number,
    Y: number,
    Z: number,
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

type Desk = {
    /**
     * Return true if the lamp is on
     */
    GetLampState(this: void): boolean;
    SetLampState(this: void, state: boolean): void;
}


type InputSource = { }


/*
 * Inputs
 */
type DirectionalInput = {
    /**
     * The position of the stick along the X axis, ranging from -100 to 100
     * @remark this is a floating point
     */
    readonly X: number,
    /**
     * The position of the stick along the Y axis, ranging from -100 to 100
     * @remark this is a floating point
     */
    readonly Y: number,
    InputSourceX?: InputSource,
    InputSourceY?: InputSource,
}

type ClickButton = {
    InputSource: InputSource;
    /**
     * The pressed/released state of the button.
     */
    readonly ButtonState: boolean;
    /**
     * A boolean flag which will be true only in the time tick the corresponding button changes it's state to pressed.
     */
    readonly ButtonDown: boolean,
    /**
     * A boolean flag which will be true only in the time tick the corresponding button changes it's state to released.
     */
    readonly ButtonUp: boolean,
}

type MovingButton = {
    /**
     * The actual positional value of the Knob, ranging from -100 to 100
     */
    Value: number,
    /**
     * `true` if the user is moving the knob
     */
    readonly IsMoving: boolean
}

type Stick = DirectionalInput & {
    InputSourceX: undefined,
    InputSourceY: undefined,
    StickValueChangeEvent(event: ({X: number, Y: number, Type: string}) => any): void
}

type DPad = DirectionalInput & {
    X: 0 | 100 | -100,
    Y: 0 | 100 | -100,
    InputSourceX: undefined,
    InputSourceY: undefined,
    DPadValueChangeEvent(event: ({X: number, Y: number, Type: string}) => any): void
}

type Keypad = {
    /**
     * A multi-dimensional table mapping the state of each button to a boolean value.
     * The table must be addressed with [column][row]. A value of true means that the
     * corrisponding button is pressed, a value of false tha the button is in it's released state.
     * @remark A keypad is in size of [4, 4]
     */
    readonly ButtonState: ReadOnlyFixedSizeArray<4, ReadOnlyFixedSizeArray<4, boolean>>,
    /**
     * A multi-dimensional table mapping boolean flags which will be true only
     * in the time tick the corresponding button changes it's state to pressed.
     * The table must be addressed with [column][row]
     * @remark A keypad is in size of [4, 4]
     */
    readonly ButtonsDown: ReadOnlyFixedSizeArray<4, ReadOnlyFixedSizeArray<4, boolean>>,
    /**
     * A multi-dimensional table mapping boolean flags which will be true only
     * in the time tick the corresponding button changes it's state to released.
     * The table must be addressed with [column][row]
     * @remark A keypad is in size of [4, 4]
     */
    readonly ButtonsUp: ReadOnlyFixedSizeArray<4, ReadOnlyFixedSizeArray<4, boolean>>,
    ButtonsInputSource: FixedSizeArray<4, FixedSizeArray<4, undefined>>,
    Symbols: undefined, // Symbol[][], the docs describe it, but accessing it is a RuntimeError
    KeypadButtonEvent(event: ({X: number, Y: number, ButtonDown: boolean, Type: string}) => any): void
}

type Knob = MovingButton & {
    /**
     * Sent when the value is changed
     */
    KnobValueChangeEvent(event: ({value: number, Type: string}) => any): void
}


type LedButton = ClickButton & {
    /**
     * The lit/unlit state of the Led.
     */
    LedState: boolean,
    /**
     * The color of the Led.
     */
    LedColor: Color,
    Symbol: undefined, // Symbol, the docs describe it, but accessing it is a RuntimeError
    /**
     * Sent when the LedButton is pressed or released
     */
    LedButtonEvent(event: ({ButtonDown: boolean, ButtonUp: boolean, Type: string}) => any): void

}

type ScreenButton = ClickButton & {
    /**
     * The videochip the screen part of this button is bound to.
     */
    VideoChip: VideoChip,
    Offset: vec2,
    Width: number,
    Height: number,
    /**
     * Sent when the ScreenButton is pressed or released
     */
    ScreenButtonEvent(event: ({ButtonDown: boolean, ButtonUp: boolean, Type: string}) => any): void
}

type Slider = MovingButton & {
    /**
     * Sent when the value is changed
     */
    SliderValueChangeEvent(event: ({Value: number, Type: string}) => any): void
}

type Switch = {
    /**
     * The state of this switch.
     */
    InputSource: InputSource,
    State: boolean,
    Symbol: undefined, // Symbol, the docs describe it, but accessing it is a RuntimeError
    SwitchStateChangeEvent(event: ({State: boolean, Type: string}) => any): void
}

type Webcam = {
    /**
     * The VideoChip this camera is streaming contents to.
     */
    RenderTarget: VideoChip,
    readonly AccessDenied: boolean,
    readonly IsActive: boolean,
    readonly IsAvailable: boolean,
    /**
     * Gets the camera RenderBuffer. The render buffer obtained can then be fed to the DrawRenderBuffer method of the VideoChip module.
     */
    GetRenderBuffer(): RenderBuffer,
    WebcamIsActiveEvent(event: ({IsActive: boolean, IsAvailable: boolean, AccessDenied: boolean, Type: string}) => any): void
}

/*
 * Outputs
 */
type Gauge = {
    /**
     * Position 0-100
     */
    Value: number
}

type Lcd = {
    /**
     * The text to be visualized on the Lcd.
     */
    Text: string,
    /**
     * Background color for the Lcd.
     */
    BgColor: Color,
    /**
     * The color for thew displayed text.
     */
    TextColor: Color
}

type Led = {
    /**
     * Led on/off state
     */
    State: boolean,
    /**
     * Led color
     */
    Color: color
}

type LedMatrix = {
    /**
     * A multi-dimensional table that maps all the Led lit/unlit stattus. Should be addressed with [column][row]
     * @remark LedMatrix is of size [8, 8]
     */
    States: FixedSizeArray<8, FixedSizeArray<8, boolean>>,
    Colors: FixedSizeArray<8, FixedSizeArray<8, color>>
}

type LedStrip<N extends number> = {
    States: FixedSizeArray<N, boolean>,
    Colors: FixedSizeArray<N, boolean>
}

type LedStrip8 = LedStrip<8>;
type LedStrip5 = LedStrip<5>;
type LedStrip4 = LedStrip<4>;

type Screen = {
    /**
     * The videochip this screen is bound to.
     */
    VideoChip: VideoChip,
    readonly Offset: vec2,
    readonly Width: number,
    readonly Height: number,
}

type SegmentDisplay<N extends number> = {
    /**
     * A table that maps the lit/unlit state of all the Leds in the display.
     */
    States: FixedSizeArray<N, boolean>,
    /**
     * A table that maps the color of all the Leds in the display.
     */
    Colors: FixedSizeArray<N, color>,
    ShowDigit(groupIndex: IntRange<0, N>,  digit: number),
    SetDigitColor(groupIndex: IntRange<0, N>, color: color)
}

/**
 * The clock 7 segment display is addressed on 
 * 0, 1: hours
 * 2: double colon
 * 3, 4: minutes
 */
type SegmentDisplay5 = SegmentDisplay<5>;
type SegmentDisplay4 = SegmentDisplay<4>;
type SegmentDisplay2 = SegmentDisplay<2>;
type SegmentDisplay1 = SegmentDisplay<1>;

type Speaker = {
    State: boolean
}



/*
 * Misc
 */
type AudioChip = {
    readonly ChannelsCount: number,
    Volume: number,
    /**
     * Returns the audio spectrum values of a channel as a table of number values,
     * each one expressing the value of a different frequency.
     * samplesCount must be a power of 2 (ie 128/256/512 etc) Min = 64 Max = 8192.
     */
    GetSpectrumData(channel: number, samplesCount: number): number[],
    GetDspTime(): number,
    Play(audioSample: AudioSample, channel: number),
    PlaySchedules(audioSample: AudioSample, channel: number, dspTime: number),
    PlayLoop(audioSample: AudioSample, channel: number),
    PlayLoopSchedules(audioSample: AudioSample, channel: number, dspTime: number),
    Stop(channel: number),
    Pause(channel: number),
    UnPause(channel: number),
    IsPlaying(channel: number): boolean,
    GetPlayTime(channel: number): number,
    SeekPlayTime(time: number, channel: number),
    SetChannelVolume(volume: number, channel: number),
    GetChannelVolume(volume: number): number,
    SetChannelPitch(pitch: number, channel: number),
    GetChannelPitch(channel: number): number
}

type CPU = {
    readonly Source: Code,
    readonly Time: number,
    readonly DeltaTime: number,
    EventChannels: Module[]
}

type Decoration = { }

type FlashMemory<T> = {
    readonly Size: number,
    readonly Usage: number,
    Save(table: T[]): boolean,
    Load(table): T[]
}

type InputName = "GamepadChip.LeftStickX" |
    "GamepadChip.LeftStickY" | 
    "GamepadChip.RightStickX" | 
    "GamepadChip.RightStickY" | 
    "GamepadChip.ActionBottomRow1" | 
    "GamepadChip.ActionBottomRow2" | 
    "GamepadChip.ActionBottomRow3" | 
    "GamepadChip.ActionTopRow1" | 
    "GamepadChip.ActionTopRow2" | 
    "GamepadChip.ActionTopRow3" | 
    "GamepadChip.LeftShoulder1" | 
    "GamepadChip.LeftShoulder2" | 
    "GamepadChip.RightShoulder1" | 
    "GamepadChip.RightShoulder2" | 
    "GamepadChip.Center1" | 
    "GamepadChip.Center2" | 
    "GamepadChip.Center3" | 
    "GamepadChip.LeftStickButton" | 
    "GamepadChip.RightStickButton" | 
    "GamepadChip.DPadUp" | 
    "GamepadChip.DPadRight" | 
    "GamepadChip.DPadDown" | 
    "GamepadChip.DPadLeft";

type GamepadChip = {
    GamepadIndex: number,
    readonly IsActive: number,
    GetButton(name: InputName): InputSource,
    GetAxis(name: InputName): InputSource,
    GetButtonAxis(negativeNAme: InputName, positiveName: InputName): InputSource,
    GamepadChipIsActiveEvent(event: ({IsActive: boolean, Type: string}) => any): void,
    GamepadChipButtonEvent(event: ({ButtonDown: boolean, ButtonUp: boolean, IsAxis: boolean, InputName: InputName, Type: string}) => any): void
}

type KeyboardButtonName = "KeyboardChip.Return" | 
    "KeyboardChip.Space" | 
    "KeyboardChip.LeftArrow" | 
    "KeyboardChip.RightArrow" | 
    "KeyboardChip.DownArrow" | 
    "KeyboardChip.UpArrow" | 
    "KeyboardChip.Backspace" | 
    "KeyboardChip.Escape" | 
    "KeyboardChip.Tab" | 
    "KeyboardChip.Clear" | 
    "KeyboardChip.Pause" | 
    "KeyboardChip.Exclaim" | 
    "KeyboardChip.DoubleQuote" | 
    "KeyboardChip.Hash" | 
    "KeyboardChip.Dollar" | 
    "KeyboardChip.Percent" | 
    "KeyboardChip.Ampersand" | 
    "KeyboardChip.Quote" | 
    "KeyboardChip.LeftParen" | 
    "KeyboardChip.RightParen" | 
    "KeyboardChip.Asterisk" | 
    "KeyboardChip.Plus" | 
    "KeyboardChip.Comma" | 
    "KeyboardChip.Minus" | 
    "KeyboardChip.Period" | 
    "KeyboardChip.Slash" | 
    "KeyboardChip.Alpha0" | 
    "KeyboardChip.Alpha1" | 
    "KeyboardChip.Alpha2" | 
    "KeyboardChip.Alpha3" | 
    "KeyboardChip.Alpha4" | 
    "KeyboardChip.Alpha5" | 
    "KeyboardChip.Alpha6" | 
    "KeyboardChip.Alpha7" | 
    "KeyboardChip.Alpha8" | 
    "KeyboardChip.Alpha9" | 
    "KeyboardChip.Colon" | 
    "KeyboardChip.Semicolon" | 
    "KeyboardChip.Less" | 
    "KeyboardChip.Equals" | 
    "KeyboardChip.Greater" | 
    "KeyboardChip.Question" | 
    "KeyboardChip.At" | 
    "KeyboardChip.LeftBracket" | 
    "KeyboardChip.Backslash" | 
    "KeyboardChip.RightBracket" | 
    "KeyboardChip.Caret" | 
    "KeyboardChip.Underscore" | 
    "KeyboardChip.BackQuote" | 
    "KeyboardChip.A" | 
    "KeyboardChip.B" | 
    "KeyboardChip.C" | 
    "KeyboardChip.D" | 
    "KeyboardChip.E" | 
    "KeyboardChip.F" | 
    "KeyboardChip.G" | 
    "KeyboardChip.H" | 
    "KeyboardChip.I" | 
    "KeyboardChip.J" | 
    "KeyboardChip.K" | 
    "KeyboardChip.L" | 
    "KeyboardChip.M" | 
    "KeyboardChip.N" | 
    "KeyboardChip.O" | 
    "KeyboardChip.P" | 
    "KeyboardChip.Q" | 
    "KeyboardChip.R" | 
    "KeyboardChip.S" | 
    "KeyboardChip.T" | 
    "KeyboardChip.U" | 
    "KeyboardChip.V" | 
    "KeyboardChip.W" | 
    "KeyboardChip.X" | 
    "KeyboardChip.Y" | 
    "KeyboardChip.Z" | 
    "KeyboardChip.LeftCurlyBracket" | 
    "KeyboardChip.Pipe" | 
    "KeyboardChip.RightCurlyBracket" | 
    "KeyboardChip.Tilde" | 
    "KeyboardChip.Delete" | 
    "KeyboardChip.Keypad0" | 
    "KeyboardChip.Keypad1" | 
    "KeyboardChip.Keypad2" | 
    "KeyboardChip.Keypad3" | 
    "KeyboardChip.Keypad4" | 
    "KeyboardChip.Keypad5" | 
    "KeyboardChip.Keypad6" | 
    "KeyboardChip.Keypad7" | 
    "KeyboardChip.Keypad8" | 
    "KeyboardChip.Keypad9" | 
    "KeyboardChip.KeypadPeriod" | 
    "KeyboardChip.KeypadDivide" | 
    "KeyboardChip.KeypadMultiply" | 
    "KeyboardChip.KeypadMinus" | 
    "KeyboardChip.KeypadPlus" | 
    "KeyboardChip.KeypadEnter" | 
    "KeyboardChip.KeypadEquals" | 
    "KeyboardChip.Insert" | 
    "KeyboardChip.Home" | 
    "KeyboardChip.End" | 
    "KeyboardChip.PageUp" | 
    "KeyboardChip.PageDown" | 
    "KeyboardChip.F1" | 
    "KeyboardChip.F2" | 
    "KeyboardChip.F3" | 
    "KeyboardChip.F4" | 
    "KeyboardChip.F5" | 
    "KeyboardChip.F6" | 
    "KeyboardChip.F7" | 
    "KeyboardChip.F8" | 
    "KeyboardChip.F9" | 
    "KeyboardChip.F10" | 
    "KeyboardChip.F11" | 
    "KeyboardChip.F12" | 
    "KeyboardChip.F13" | 
    "KeyboardChip.F14" | 
    "KeyboardChip.F15" | 
    "KeyboardChip.Numlock" | 
    "KeyboardChip.CapsLock" | 
    "KeyboardChip.ScrollLock" | 
    "KeyboardChip.RightShift" | 
    "KeyboardChip.LeftShift" | 
    "KeyboardChip.RightControl" | 
    "KeyboardChip.LeftControl" | 
    "KeyboardChip.RightAlt" | 
    "KeyboardChip.LeftAlt" | 
    "KeyboardChip.RightCommand" | 
    "KeyboardChip.LeftCommand" | 
    "KeyboardChip.AltGr" | 
    "KeyboardChip.Help" | 
    "KeyboardChip.Print" | 
    "KeyboardChip.SysReq" | 
    "KeyboardChip.Break" | 
    "KeyboardChip.Menu";

type KeyboardChip = {
    GetButton(name: KeyboardButtonName): InputSource,
    GetButtonAxis(negativeName: KeyboardButtonName, positiveName: KeyboardButtonName): InputSource,
    KeyboardChipEvent(event: ({ButtonDown: boolean, ButtonUp: boolean, InputName: KeyboardButtonName, Type: string}) => any): void
}

type MagneticConnector = {
    readonly ButtonState: boolean,
    readonly IsConnected: boolean
}

type PowerButton = {
    readonly ButtonState: boolean
}

type RealityChip = {
    Cpu: {
        TotalUsage: number,
        CoresUsage: number
    },
    Ram: {
        Available: number,
        Used: number
    },
    Network: {
        TotalSent: number,
        TotalReceived: number
    }
}

type RomAssets = {
    Assets: {[k: string]: Asset},
    SpriteSheets: {[k: string]: SpriteSheet},
    Codes: {[k: string]: Code},
    AudioSamples: {[k: string]: AudioSample},
}

type ROM = {
    User: RomAssets,
    System: RomAssets
}

type SecurityChip = { }

type VideoChipMode = "SingleBuffer" | "DoubleBuffer"

type VideoChip = {
    Mode: VideoChipMode,
    readonly Height: number,
    readonly Width: number,
    Clear(color: color): void,
    SetPixel(position: vec2, color: color): void,
    DrawPointGrid(gridOffset: vec2, dotsDistance: number, color: color): void,
    DrawLine(start: vec2, end: vec2, color: color): void,
    DrawCircle(position: vec2, radius: number, color: color): void,
    FillCircle(podition: vec2, radius: number, color: color): void,
    DrawRect(position1: vec2, position2: vec2, color: color): void,
    FillRect(position1: vec2, position2: vec2, color: color): void,
    DrawTriange(position1: vec2, position2: vec2, position3: vec2, color: color): void,
    FillTriange(position1: vec2, position2: vec2, position3: vec2, color: color): void,
    DrawSprite(position: vec2, spriteSheet: SpriteSheet, spriteX: number, spriteY: number, tintColor: color, backgroundColor: color): void,
    DrawText(position: vec2, fontSprite: SpriteSheet, text: string, textColor: color, backgroundColor: color): void,
    RasterSprite(position1: vec2, position2: vec2, position3: vec2, position4: vec2, spriteSheet: SpriteSheet, spriteX: number, spriteY: number, tintColor: color, backgroundColor: color): void,
    DrawRenderBuffer(position: vec2, renderBuffer: RenderBuffer, width: number, height: number): void
}

type Wifi = {
    readonly AccessDenied: boolean,
    WebGet(url: string): number,
    WebPutData(url: string, data: string): number,
    WebPostData(url: string, data: string): number,
    WebPostForm(url: string, data: {[k: string]: any}): number,
    WebCustomRequest(url: string, method: string, customHeaderField: {[k: string]: string}, contentType: string, contentData: string): number,
    WebAbort(handle: number): boolean,
    GetWebUploadProgress(handle: number): number,
    GetWebDownloadProgress(handle: number): number,
    ClearCookieCache(): void,
    GetUrlCookieCache(url: string),
    WifiWebResponseVent(event: ({RequestHandle: number, ResponseCode: number, IsError: boolean, ErrorType: string, ErrorMessage: string, ContentType: string, Text: string, Type: string }) => any): void
}

/*
 * Assets
 */

type SpriteSheet = {
    Palatte: Palette 
}

type RenderBuffer = {

}

type Code = {

}

type AudioSample = {

}

type Palette = {

}

