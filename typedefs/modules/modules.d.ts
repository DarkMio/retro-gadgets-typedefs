/// Collection of all Module declarations

/**
 * Module brand to avoid accidential object instantiation for modules
 */
type __ModuleBrand = {
    /**
     * Virtual, non existing property that guards against accidential instantiation
     */
    __moduleBrand: never;
}

/**
 * Modules are components that can be plugged on a gadget
 */
type Module = Stick |
    DPad |
    Keypad |
    Knob |
    LedButton |
    ScreenButton |
    Slider |
    Switch |
    Webcam |
    AudioChip |
    CPU |
    Decoration |
    FlashMemory<any> |
    InputName |
    GamepadChip |
    KeyboardButtonName |
    KeyboardChip |
    MagneticConnector |
    PowerButton |
    RealityChip |
    RomAssets |
    ROM |
    SecurityChip |
    VideoChip |
    Wifi |
    Gauge |
    Lcd |
    Led |
    LedMatrix |
    LedStrip8 |
    LedStrip5 |
    LedStrip4 |
    Screen |
    SegmentDisplay5 |
    SegmentDisplay4 |
    SegmentDisplay2 |
    SegmentDisplay1 |
    Speaker;

/**
 * InputSources are components that can generate input events if wired to a CPU
 */
type InputSource = DirectionalInput |
    ClickButton |
    MovingButton |
    Stick |
    DPad |
    Keypad |
    Knob |
    LedButton |
    ScreenButton |
    Slider |
    Switch |
    Webcam;