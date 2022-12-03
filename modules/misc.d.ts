/// Misc
/// https://docs.retrogadgets.game/api/moduleCategories/Misc.html

type AudioChip = __ModuleBrand & {
    /**
     * Number of available channels for this AudioChip. Each channel can independently play an audio sample.
     */
    readonly ChannelsCount: number;
    /**
     * The global AudioChip volume.
     */
    Volume: number;
    /**
     * Returns the audio spectrum values of a `channel` as a table of number values,
     * each one expressing the value of a different frequency.
     * `samplesCount` must be a power of 2 (ie 128/256/512 etc) Min = 64 Max = 8192.
     */
    GetSpectrumData(
        channel: number,
        samplesCount: 64 | 128 | 256 | 512 | 1024 | 2048 | 4096 | 8192
    ): number[];
    /**
     * Returns the current internal AudioChip's DSP time.
     * It is meant to be used in combination with the PlayScheduled method.
     * The returned number is expressed in seconds.
     */
    GetDspTime(): number;
    /**
     * Immediately plays an AudioSample on a specific `channel`.
     */
    Play(audioSample: AudioSample, channel: number): void;
    /**
     * Schedule the play of and AudioSample at a specific DSP time, expressed in seconds, on the specific channel.
     */
    PlaySchedules(audioSample: AudioSample, channel: number, dspTime: number): void;
    /**
     * Immediately plays an AudioSample on a specific channel, looping it.
     */
    PlayLoop(audioSample: AudioSample, channel: number): void;
    /**
     * Schedule the play of and AudioSample at a specific DSP time, expressed in seconds, on the specific `channel`, looping it.
     */
    PlayLoopSchedules(audioSample: AudioSample, channel: number, dspTime: number): void;
    /**
     * Stops any audio playing on a specific `channel`
     */
    Stop(channel: number): void;
    /**
     * Pause the audio on a specific `channel`
     */
    Pause(channel: number): void;
    /**
     * Resumes the audio on a specific `channel`
     */
    UnPause(channel: number): void;
    /**
     * Returns `true` if a `channel` is currently playing audio
     */
    IsPlaying(channel: number): boolean;
    /**
     * Returns `true` if a `channel` is currently paused.
     */
    IsPaused(channel: number): boolean;
    /**
     * Returns the current play time of a `channel`, expressed in seconds.
     */
    GetPlayTime(channel: number): number;
    /**
     * Sets the current position of the play head, for the specific `channel`, expressed in seconds.
     */
    SeekPlayTime(time: number, channel: number): void;
    /**
     * Sets the current `volume` for a `channel`, 0-100 range.
     */
    SetChannelVolume(volume: IntRange<0, 100>, channel: number): void;
    /**
     * Gets the current volume for a channel, 0-100 range.
     */
    GetChannelVolume(volume: number): IntRange<0, 100>;
    /**
     * Sets the `pitch` for a `channel`. Acts as a multiplier.
     * A value of 1 means the default `pitch` for a sample,
     * a value of 2 plays the sample one octave higher.
     */
    SetChannelPitch(pitch: number, channel: number): void;
    /**
     * Gets the current pitch of a `channel`.
     */
    GetChannelPitch(channel: number): number;
};

type CPU = __ModuleBrand & {
    /**
     * The code asset uploaded to the cpu.
     */
    readonly Source: Code;
    /**
     * The time since the gadget is turned on, expressed in seconds.
     */
    readonly Time: number;
    /**
     * The time elapsed since the last tick, expressed in seconds.
     */
    readonly DeltaTime: number;
    EventChannels: Module[];
};

type Decoration = __ModuleBrand & {};

type FlashMemory<T> = __ModuleBrand & {
    readonly Size: number;
    readonly Usage: number;
    Save(table: any): boolean;
    Load(): T[];
};

type InputName =
    | 'GamepadChip.LeftStickX'
    | 'GamepadChip.LeftStickY'
    | 'GamepadChip.RightStickX'
    | 'GamepadChip.RightStickY'
    | 'GamepadChip.ActionBottomRow1'
    | 'GamepadChip.ActionBottomRow2'
    | 'GamepadChip.ActionBottomRow3'
    | 'GamepadChip.ActionTopRow1'
    | 'GamepadChip.ActionTopRow2'
    | 'GamepadChip.ActionTopRow3'
    | 'GamepadChip.LeftShoulder1'
    | 'GamepadChip.LeftShoulder2'
    | 'GamepadChip.RightShoulder1'
    | 'GamepadChip.RightShoulder2'
    | 'GamepadChip.Center1'
    | 'GamepadChip.Center2'
    | 'GamepadChip.Center3'
    | 'GamepadChip.LeftStickButton'
    | 'GamepadChip.RightStickButton'
    | 'GamepadChip.DPadUp'
    | 'GamepadChip.DPadRight'
    | 'GamepadChip.DPadDown'
    | 'GamepadChip.DPadLeft';

type GamepadChip = __ModuleBrand & {
    GamepadIndex: number;
    readonly IsActive: number;
    GetButton(name: InputName): InputSource;
    GetAxis(name: InputName): InputSource;
    GetButtonAxis(negativeName: InputName, positiveName: InputName): InputSource;
};

type KeyboardButtonName =
    | 'KeyboardChip.Return'
    | 'KeyboardChip.Space'
    | 'KeyboardChip.LeftArrow'
    | 'KeyboardChip.RightArrow'
    | 'KeyboardChip.DownArrow'
    | 'KeyboardChip.UpArrow'
    | 'KeyboardChip.Backspace'
    | 'KeyboardChip.Escape'
    | 'KeyboardChip.Tab'
    | 'KeyboardChip.Clear'
    | 'KeyboardChip.Pause'
    | 'KeyboardChip.Exclaim'
    | 'KeyboardChip.DoubleQuote'
    | 'KeyboardChip.Hash'
    | 'KeyboardChip.Dollar'
    | 'KeyboardChip.Percent'
    | 'KeyboardChip.Ampersand'
    | 'KeyboardChip.Quote'
    | 'KeyboardChip.LeftParen'
    | 'KeyboardChip.RightParen'
    | 'KeyboardChip.Asterisk'
    | 'KeyboardChip.Plus'
    | 'KeyboardChip.Comma'
    | 'KeyboardChip.Minus'
    | 'KeyboardChip.Period'
    | 'KeyboardChip.Slash'
    | 'KeyboardChip.Alpha0'
    | 'KeyboardChip.Alpha1'
    | 'KeyboardChip.Alpha2'
    | 'KeyboardChip.Alpha3'
    | 'KeyboardChip.Alpha4'
    | 'KeyboardChip.Alpha5'
    | 'KeyboardChip.Alpha6'
    | 'KeyboardChip.Alpha7'
    | 'KeyboardChip.Alpha8'
    | 'KeyboardChip.Alpha9'
    | 'KeyboardChip.Colon'
    | 'KeyboardChip.Semicolon'
    | 'KeyboardChip.Less'
    | 'KeyboardChip.Equals'
    | 'KeyboardChip.Greater'
    | 'KeyboardChip.Question'
    | 'KeyboardChip.At'
    | 'KeyboardChip.LeftBracket'
    | 'KeyboardChip.Backslash'
    | 'KeyboardChip.RightBracket'
    | 'KeyboardChip.Caret'
    | 'KeyboardChip.Underscore'
    | 'KeyboardChip.BackQuote'
    | 'KeyboardChip.A'
    | 'KeyboardChip.B'
    | 'KeyboardChip.C'
    | 'KeyboardChip.D'
    | 'KeyboardChip.E'
    | 'KeyboardChip.F'
    | 'KeyboardChip.G'
    | 'KeyboardChip.H'
    | 'KeyboardChip.I'
    | 'KeyboardChip.J'
    | 'KeyboardChip.K'
    | 'KeyboardChip.L'
    | 'KeyboardChip.M'
    | 'KeyboardChip.N'
    | 'KeyboardChip.O'
    | 'KeyboardChip.P'
    | 'KeyboardChip.Q'
    | 'KeyboardChip.R'
    | 'KeyboardChip.S'
    | 'KeyboardChip.T'
    | 'KeyboardChip.U'
    | 'KeyboardChip.V'
    | 'KeyboardChip.W'
    | 'KeyboardChip.X'
    | 'KeyboardChip.Y'
    | 'KeyboardChip.Z'
    | 'KeyboardChip.LeftCurlyBracket'
    | 'KeyboardChip.Pipe'
    | 'KeyboardChip.RightCurlyBracket'
    | 'KeyboardChip.Tilde'
    | 'KeyboardChip.Delete'
    | 'KeyboardChip.Keypad0'
    | 'KeyboardChip.Keypad1'
    | 'KeyboardChip.Keypad2'
    | 'KeyboardChip.Keypad3'
    | 'KeyboardChip.Keypad4'
    | 'KeyboardChip.Keypad5'
    | 'KeyboardChip.Keypad6'
    | 'KeyboardChip.Keypad7'
    | 'KeyboardChip.Keypad8'
    | 'KeyboardChip.Keypad9'
    | 'KeyboardChip.KeypadPeriod'
    | 'KeyboardChip.KeypadDivide'
    | 'KeyboardChip.KeypadMultiply'
    | 'KeyboardChip.KeypadMinus'
    | 'KeyboardChip.KeypadPlus'
    | 'KeyboardChip.KeypadEnter'
    | 'KeyboardChip.KeypadEquals'
    | 'KeyboardChip.Insert'
    | 'KeyboardChip.Home'
    | 'KeyboardChip.End'
    | 'KeyboardChip.PageUp'
    | 'KeyboardChip.PageDown'
    | 'KeyboardChip.F1'
    | 'KeyboardChip.F2'
    | 'KeyboardChip.F3'
    | 'KeyboardChip.F4'
    | 'KeyboardChip.F5'
    | 'KeyboardChip.F6'
    | 'KeyboardChip.F7'
    | 'KeyboardChip.F8'
    | 'KeyboardChip.F9'
    | 'KeyboardChip.F10'
    | 'KeyboardChip.F11'
    | 'KeyboardChip.F12'
    | 'KeyboardChip.F13'
    | 'KeyboardChip.F14'
    | 'KeyboardChip.F15'
    | 'KeyboardChip.Numlock'
    | 'KeyboardChip.CapsLock'
    | 'KeyboardChip.ScrollLock'
    | 'KeyboardChip.RightShift'
    | 'KeyboardChip.LeftShift'
    | 'KeyboardChip.RightControl'
    | 'KeyboardChip.LeftControl'
    | 'KeyboardChip.RightAlt'
    | 'KeyboardChip.LeftAlt'
    | 'KeyboardChip.RightCommand'
    | 'KeyboardChip.LeftCommand'
    | 'KeyboardChip.AltGr'
    | 'KeyboardChip.Help'
    | 'KeyboardChip.Print'
    | 'KeyboardChip.SysReq'
    | 'KeyboardChip.Break'
    | 'KeyboardChip.Menu';

type KeyboardChip = __ModuleBrand & {
    GetButton(name: KeyboardButtonName): InputSource;
    GetButtonAxis(negativeName: KeyboardButtonName, positiveName: KeyboardButtonName): InputSource;
};

type MagneticConnector = __ModuleBrand & {
    /**
     * Reflect the pressed/released state of the connector's button.
     */
    readonly ButtonState: boolean;
    /**
     * True if the connector is connected to another one. False otherwise.
     */
    readonly IsConnected: boolean;
};

type PowerButton = __ModuleBrand & {
    readonly ButtonState: boolean;
};

type RealityChip = __ModuleBrand & {
    readonly Cpu: {
        /**
         * The total CPU usage of the system 0-100
         */
        TotalUsage: number;
        /**
         * An array that contains the cpu usage of each logical CPU core 0-100
         */
        CoresUsage: number;
    };
    readonly Ram: {
        /**
         * Available RAM expressed in MB
         */
        Available: number;
        /**
         * Used RAM expressed in MB
         */
        Used: number;
    };
    readonly Network: {
        /**
         * Total sent by network interfaces expressed in Mbps
         */
        TotalSent: number;
        /**
         * Total received from network interfaces expressed in Mbps
         */
        TotalReceived: number;
    };
};

type RomAssets = {
    readonly Assets: { [k: string]: Asset };
    readonly SpriteSheets: { [k: string]: SpriteSheet };
    readonly Codes: { [k: string]: Code };
    readonly AudioSamples: { [k: string]: AudioSample };
};

type ROM = __ModuleBrand & {
    readonly User: RomAssets;
    readonly System: RomAssets;
};

type SecurityChip = __ModuleBrand & {};

/**
 * VideoChip rendering mode.
 */
declare enum VideoChipMode {
    'SingleBuffer',
    'DoubleBuffer',
}

type VideoChip = __ModuleBrand & {
    /**
     * The SingleBuffer/DoubleBuffer mode for this VideoChip.
     */
    Mode: VideoChipMode;
    /**
     * Height in pixels of the rendering buffer.
     * The area takes in account all the displays cound to this VideoChip.
     */
    readonly Height: number;
    /**
     * WIdth in pixels of the rendering buffer.
     * The area takes in account all the displays cound to this VideoChip.
     */
    readonly Width: number;
    /**
     * Clears all the render area with the specified color
     */
    Clear(color: color): void;
    /**
     * Sets the pixel at the specified `position` to the specified `color`
     */
    SetPixel(position: vec2, color: color): void;
    /**
     * Draws a dotted grid on the entire display area, with an offset.
     * The `dotsDistance` parameter express the distance in pixels, on both axis, between dots.
     */
    DrawPointGrid(gridOffset: vec2, dotsDistance: number, color: color): void;
    /**
     * Draws a line from position `start` to position `end`, using the specified `color`
     */
    DrawLine(start: vec2, end: vec2, color: color): void;
    /**
     * Draws an empty circle at the specified `position`,
     * with the specified `radius`, in the specified `color`.
     */
    DrawCircle(position: vec2, radius: number, color: color): void;
    /**
     * Draws a filled circle at the specified position,
     * with the specified `radius`, in the specified `color`.
     */
    FillCircle(podition: vec2, radius: number, color: color): void;
    /**
     * Draws an empty rect from `position1` to `position2`, in the specified `color`.
     */
    DrawRect(position1: vec2, position2: vec2, color: color): void;
    /**
     * Draws a filled rect from `position1` to `position2`, in the specified `color`.
     */
    FillRect(position1: vec2, position2: vec2, color: color): void;
    /**
     * Draws an empty triangle with vertexes in `position1`, `position2` and
     * `position3`, in the specified `color`.
     */
    DrawTriange(position1: vec2, position2: vec2, position3: vec2, color: color): void;
    /**
     * Draws a filled triangle with vertexes in `position1`, `position2` and
     * `position3`, in the specified `color`.
     */
    FillTriange(position1: vec2, position2: vec2, position3: vec2, color: color): void;
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
    DrawSprite(
        position: vec2,
        spriteSheet: SpriteSheet,
        spriteX: number,
        spriteY: number,
        tintColor: color,
        backgroundColor: color
    ): void;
    /**
     * Draws the string contained in the `text` parameter, at the desired `position`, using `textColor` and `backgroundColor`.
     * The parameter `fontSprite` contains a special kind of spriteSheet asset labeled as font.
     * The only font supported can be loaded with:
     * `spriteFont = GetSpriteSheet("Builtin/StandardFont")`
     */
    DrawText(
        position: vec2,
        fontSprite: SpriteSheet,
        text: string,
        textColor: color,
        backgroundColor: color
    ): void;
    /**
     * Draws an entire sprite sheet mapping it on a quad identified by `position1`, `position2`, `position3`, `position4`
     */
    RasterSprite(
        position1: vec2,
        position2: vec2,
        position3: vec2,
        position4: vec2,
        spriteSheet: SpriteSheet,
        spriteX: number,
        spriteY: number,
        tintColor: color,
        backgroundColor: color
    ): void;
    /**
     * Draws a render buffer (supposedly coming from Webcam component) at the desired `position`, `width` and `height`
     */
    DrawRenderBuffer(
        position: vec2,
        renderBuffer: RenderBuffer,
        width: number,
        height: number
    ): void;
};

type Wifi = __ModuleBrand & {
    readonly AccessDenied: boolean;
    /**
     * Send a web HTTP GET request, return a numeric handle to identify the request
     */
    WebGet(url: string): number;
    /**
     * Send a web HTTP PUT request, return a numeric handle to identify the request
     */
    WebPutData(url: string, data: string): number;
    /**
     * Send a web HTTP POST request, return a numeric handle to identify the request
     */
    WebPostData(url: string, data: string): number;
    /**
     * Send a web HTTP POST request, return a numeric handle to identify the request
     */
    WebPostForm(url: string, data: { [k: string]: any }): number;
    /**
     * Send a web request, return a numeric handle to identify the request
     */
    WebCustomRequest(
        url: string,
        method: string,
        customHeaderField: { [k: string]: string },
        contentType: string,
        contentData: string
    ): number;
    /**
     * Abort a web request
     */
    WebAbort(handle: number): boolean;
    /**
     * Percentual [0-100]
     */
    GetWebUploadProgress(handle: number): number;
    /**
     * Percentual [0-100]
     */
    GetWebDownloadProgress(handle: number): number;
    /**
     * Clear stored cookies
     */
    ClearCookieCache(): void;
    /**
     * Only cookies that apply to this url will be removed from the cache
     */
    ClearUrlCookieCache(url: string): void;
};
