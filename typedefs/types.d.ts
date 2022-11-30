/*
 * Globals
 */
type color = {
    A: number,
    B: number,
    G: number,
    R: number
}

type ANSIColors = 30 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 90 | 91 | 92 | 93 | 94 | 95 | 96 | 97

type Desk = {
    GetLampState(this: void): boolean;
    SetLampState(this: void, state: boolean): void;
}



/*
 * Inputs
 */
type DirectionalInput = {
    X: number,
    Y: number,
    InputSourceX: InputSource,
    InputSourceY: InputSource,
}

type ClickButton = {
    InputSource: InputSource,
    readonly ButtonState: boolean,
    readonly ButtonDown: boolean,
    readonly ButtonUp: boolean,
}

type MovingButton = {
    Value: number,
    readonly IsMoving: boolean
}

type Stick = DirectionalInput & {
    StickValueChangeEvent(event: ({X: number, Y: number, Type: string}) => any): void
}

type DPadValueChangeEvent = DirectionalInput & {
    DPadValueChangeEvent(event: ({X: number, Y: number, Type: string}) => any): void
}

type Keypad = {
    readonly ButtonState: boolean[][],
    readonly ButtonsDown: boolean[][],
    readonly ButtonsUp: boolean[][],
    ButtonsInputSource: InputSource[][],
    Symbols: Symbol[][],
    KeypadButtonEvent(event: ({X: number, Y: number, ButtonDown: boolean, Type: string}) => any): void
}

type Knob = MovingButton & {
    KnobValueChangeEvent(event: ({value: number, Type: string}) => any): void
}


type LedButton = ClickButton & {
    LedState: boolean,
    LedColor: Color,
    Symbol: Symbol
    LedButtonEvent(event: ({ButtonDown: boolean, ButtonUp: boolean, Type: string}) => any): void

}

type ScreenButton = ClickButton & {
    VideoChip: VideoChip,
    Offset: vec2,
    Width: number,
    Height: number,
    ScreenButtonEvent(event: ({ButtonDown: boolean, ButtonUp: boolean, Type: string}) => any): void
}

type Slider = MovingButton & {
    SliderValueChangeEvent(event: ({Value: number, Type: string}) => any): void
}

type Switch = {
    InputSource: InputSource,
    State: boolean,
    Symbol: Symbol,
    SwitchStateChangeEvent(event: ({State: boolean, Type: string}) => any): void
}

type Webcam = {
    RenderTarget: VideoChip,
    readonly AccessDenied: boolean,
    readonly IsActive: boolean,
    readonly IsAvailable: boolean,
    GetRenderBuffer(): RenderBuffer,
    WebcamIsActiveEvent(event: ({IsActive: boolean, IsAvailable: boolean, AccessDenied: boolean, Type: string}) => any): void
}



/*
 * Outputs
 */
type Gauge = {
    Value: number
}

type Lcd = {
    Text: string,
    BgColor: Color,
    TextColor: Color
}

type Led = {
    State: boolean,
    Color: color
}

type LedMatrix = {
    States: boolean[][],
    Colors: color[][]
}

type LedStrip = {
    States: boolean[],
    Colors: color[]
}

type Screen = {
    VideoChip: VideoChip,
    readonly Offset: vec2,
    readonly Width: number,
    readonly Height: number,
}

type SegmentDisplay = {
    Status: boolean[][],
    Colors: color[][],
    ShowDigit(groupIndex: number,  digit: number),
    SetDigitColor(groupIndex: number, color: color)
}

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

