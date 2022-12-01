/// <reference path="functions.d.ts">
/// <reference path="helpers.d.ts">

/*
 * Globals
 */

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
    /**
     * Number of available channels for this AudioChip. Each channel can independently play an audio sample.
     */
    readonly ChannelsCount: number,
    /**
     * The global AudioChip volume.
     */
    Volume: number,
    /**
     * Returns the audio spectrum values of a `channel` as a table of number values,
     * each one expressing the value of a different frequency.
     * `samplesCount` must be a power of 2 (ie 128/256/512 etc) Min = 64 Max = 8192.
     */
    GetSpectrumData(channel: number, samplesCount: 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | 8192): number[],
    /**
     * Returns the current internal AudioChip's DSP time.
     * It is meant to be used in combination with the PlayScheduled method.
     * The returned number is expressed in seconds.
     */
    GetDspTime(): number,
    /**
     * Immediately plays an AudioSample on a specific `channel`.
     */
    Play(audioSample: AudioSample, channel: number),
    /**
     * Schedule the play of and AudioSample at a specific DSP time, expressed in seconds, on the specific channel.
     */
    PlaySchedules(audioSample: AudioSample, channel: number, dspTime: number),
    /**
     * Immediately plays an AudioSample on a specific channel, looping it.
     */
    PlayLoop(audioSample: AudioSample, channel: number),
    /**
     * Schedule the play of and AudioSample at a specific DSP time, expressed in seconds, on the specific `channel`, looping it.
     */
    PlayLoopSchedules(audioSample: AudioSample, channel: number, dspTime: number),
    /**
     * Stops any audio playing on a specific `channel`
     */
    Stop(channel: number),
    /**
     * Pause the audio on a specific `channel`
     */
    Pause(channel: number),
    /**
     * Resumes the audio on a specific `channel`
     */
    UnPause(channel: number),
    /**
     * Returns `true` if a `channel` is currently playing audio
     */
    IsPlaying(channel: number): boolean,
    /**
     * Returns `true` if a `channel` is currently paused.
     */
    IsPaused(channel: number): boolean,
    /**
     * Returns the current play time of a `channel`, expressed in seconds.
     */
    GetPlayTime(channel: number): number,
    /**
     * Sets the current position of the play head, for the specific `channel`, expressed in seconds.
     */
    SeekPlayTime(time: number, channel: number),
    /**
     * Sets the current `volume` for a `channel`, 0-100 range.
     */
    SetChannelVolume(volume: IntRange<0, 100>, channel: number),
    /**
     * Gets the current volume for a channel, 0-100 range.
     */
    GetChannelVolume(volume: number): IntRange<0, 100>,
    /**
     * Sets the `pitch` for a `channel`. Acts as a multiplier.
     * A value of 1 means the default `pitch` for a sample,
     * a value of 2 plays the sample one octave higher.
     */
    SetChannelPitch(pitch: number, channel: number),
    /**
     * Gets the current pitch of a `channel`.
     */
    GetChannelPitch(channel: number): number
}

type CPU = {
    /**
     * The code asset uploaded to the cpu.
     */
    readonly Source: Code,
    /**
     * The time since the gadget is turned on, expressed in seconds.
     */
    readonly Time: number,
    /**
     * The time elapsed since the last tick, expressed in seconds.
     */
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
    /**
     * Reflect the pressed/released state of the connector's button.
     */
    readonly ButtonState: boolean,
    /**
     * True if the connector is connected to another one. False otherwise.
     */
    readonly IsConnected: boolean
}

type PowerButton = {
    readonly ButtonState: boolean
}

type RealityChip = {
    Cpu: {
        /**
         * The total CPU usage of the system 0-100
         */
        TotalUsage: number,
        /**
         * An array that contains the cpu usage of each logical CPU core 0-100
         */
        CoresUsage: number
    },
    Ram: {
        /**
         * Available RAM expressed in MB
         */
        Available: number,
        /**
         * Used RAM expressed in MB
         */
        Used: number
    },
    Network: {
        /**
         * Total sent by network interfaces expressed in Mbps
         */
        TotalSent: number,
        /**
         * Total received from network interfaces expressed in Mbps
         */
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

/**
 * VideoChip rendering mode.
 */
enum VideoChipMode {
    "SingleBuffer",
    "DoubleBuffer"
}

type VideoChip = {
    /**
     * The SingleBuffer/DoubleBuffer mode for this VideoChip.
     */
    Mode: VideoChipMode,
    /**
     * Height in pixels of the rendering buffer.
     * The area takes in account all the displays cound to this VideoChip.
     */
    readonly Height: number,
    /**
     * WIdth in pixels of the rendering buffer.
     * The area takes in account all the displays cound to this VideoChip.
     */
    readonly Width: number,
    /**
     * Clears all the render area with the specified color
     */
    Clear(color: color): void,
    /**
     * Sets the pixel at the specified `position` to the specified `color`
     */
    SetPixel(position: vec2, color: color): void,
    /**
     * Draws a dotted grid on the entire display area, with an offset.
     * The `dotsDistance` parameter express the distance in pixels, on both axis, between dots.
     */
    DrawPointGrid(gridOffset: vec2, dotsDistance: number, color: color): void,
    /**
     * Draws a line from position `start` to position `end`, using the specified `color`
     */
    DrawLine(start: vec2, end: vec2, color: color): void,
    /**
     * Draws an empty circle at the specified `position`,
     * with the specified `radius`, in the specified `color`.
     */
    DrawCircle(position: vec2, radius: number, color: color): void,
    /**
     * Draws a filled circle at the specified position,
     * with the specified `radius`, in the specified `color`.
     */
    FillCircle(podition: vec2, radius: number, color: color): void,
    /**
     * Draws an empty rect from `position1` to `position2`, in the specified `color`.
     */
    DrawRect(position1: vec2, position2: vec2, color: color): void,
    /**
     * Draws a filled rect from `position1` to `position2`, in the specified `color`.
     */
    FillRect(position1: vec2, position2: vec2, color: color): void,
    /**
     * Draws an empty triangle with vertexes in `position1`, `position2` and
     * `position3`, in the specified `color`. 
     */
    DrawTriange(position1: vec2, position2: vec2, position3: vec2, color: color): void,
    /**
     * Draws a filled triangle with vertexes in `position1`, `position2` and
     * `position3`, in the specified `color`.
     */
    FillTriange(position1: vec2, position2: vec2, position3: vec2, color: color): void,
    /**
     * Draws a specific sprite frame from the `spriteSheet`.
     * Position is the on-screen sprite desired `position` starting from the top left corner,
     * `spriteSheet` is the `SpriteSheet` asset containing the sprite frame to draw,
     * `spriteX` and spriteY are the coordinates to identify the desired sprite frame starting from the, top left corner, expressed in grid units.
     * `spriteX`=0 and `spriteY`=0 are the coordinates of the first sprite, top left.
     * `tintColor` is the color multiplier used to draw the sprite frame. `Color(255,255,255)` or `color.white` will leave the sprite frame unaffected.
     * `backgroundColor` is the color used to replay the transparent areas of the spriteFrame.
     * Using `ColorRGBA(0,0,0,0)` or `color.clear` will leave the transparency as it is.
     */
    DrawSprite(position: vec2, spriteSheet: SpriteSheet, spriteX: number, spriteY: number, tintColor: color, backgroundColor: color): void,
    /**
     * Draws the string contained in the `text` parameter, at the desired `position`, using `textColor` and `backgroundColor`.
     * The parameter `fontSprite` contains a special kind of spriteSheet asset labeled as font.
     * The only font supported can be loaded with:
     * `spriteFont = GetSpriteSheet("Builtin/StandardFont")`
     */
    DrawText(position: vec2, fontSprite: SpriteSheet, text: string, textColor: color, backgroundColor: color): void,
    /**
     * Draws an entire sprite sheet mapping it on a quad identified by `position1`, `position2`, `position3`, `position4`
     */
    RasterSprite(position1: vec2, position2: vec2, position3: vec2, position4: vec2, spriteSheet: SpriteSheet, spriteX: number, spriteY: number, tintColor: color, backgroundColor: color): void,
    /**
     * Draws a render buffer (supposedly coming from Webcam component) at the desired `position`, `width` and `height`
     */
    DrawRenderBuffer(position: vec2, renderBuffer: RenderBuffer, width: number, height: number): void
}

type Wifi = {
    readonly AccessDenied: boolean,
    /**
     * Send a web HTTP GET request, return a numeric handle to identify the request
     */
    WebGet(url: string): number,
    /**
     * Send a web HTTP PUT request, return a numeric handle to identify the request
     */
    WebPutData(url: string, data: string): number,
    /**
     * Send a web HTTP POST request, return a numeric handle to identify the request
     */
    WebPostData(url: string, data: string): number,
    /**
     * Send a web HTTP POST request, return a numeric handle to identify the request
     */
    WebPostForm(url: string, data: {[k: string]: any}): number,
    /**
     * Send a web request, return a numeric handle to identify the request
     */
    WebCustomRequest(url: string, method: string, customHeaderField: {[k: string]: string}, contentType: string, contentData: string): number,
    /**
     * Abort a web request
     */
    WebAbort(handle: number): boolean,
    /**
     * Percentual [0-100]
     */
    GetWebUploadProgress(handle: number): number,
    /**
     * Percentual [0-100]
     */
    GetWebDownloadProgress(handle: number): number,
    /**
     * Clear stored cookies
     */
    ClearCookieCache(): void,
    /**
     * Only cookies that apply to this url will be removed from the cache
     */
    GetUrlCookieCache(url: string),
    /**
     * Sent when a web request is completed
     */
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
    SamplesCount: number,
    Channels: number,
    Frequency: number,
    /**
     * Length of the AudioSample in seconds
     */
    Length: number,
}

type Palette = {

}

