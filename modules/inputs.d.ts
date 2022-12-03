/// Inputs
/// https://docs.retrogadgets.game/api/moduleCategories/Input.html

type DirectionalInput = __ModuleBrand & {
    /**
     * The position of the stick along the X axis, ranging from -100 to 100
     * @remark this is a floating point
     */
    readonly X: number;
    /**
     * The position of the stick along the Y axis, ranging from -100 to 100
     * @remark this is a floating point
     */
    readonly Y: number;
    InputSourceX?: InputSource;
    InputSourceY?: InputSource;
};

type ClickButton = __ModuleBrand & {
    InputSource: InputSource;
    /**
     * The pressed/released state of the button.
     */
    readonly ButtonState: boolean;
    /**
     * A boolean flag which will be true only in the time tick the corresponding button changes it's state to pressed.
     */
    readonly ButtonDown: boolean;
    /**
     * A boolean flag which will be true only in the time tick the corresponding button changes it's state to released.
     */
    readonly ButtonUp: boolean;
};

type MovingButton = __ModuleBrand & {
    /**
     * The actual positional value of the Knob, ranging from -100 to 100
     */
    Value: number;
    /**
     * `true` if the user is moving the knob
     */
    readonly IsMoving: boolean;
};

type Stick = DirectionalInput & {
    InputSourceX: undefined;
    InputSourceY: undefined;
};

type DPad = DirectionalInput & {
    X: 0 | 100 | -100;
    Y: 0 | 100 | -100;
    InputSourceX: undefined;
    InputSourceY: undefined;
};

type Keypad = __ModuleBrand & {
    /**
     * A multi-dimensional table mapping the state of each button to a boolean value.
     * The table must be addressed with [column][row]. A value of true means that the
     * corrisponding button is pressed, a value of false tha the button is in it's released state.
     * @remark A keypad is in size of [4, 4]
     */
    readonly ButtonState: ReadOnlyFixedSizeArray<4, ReadOnlyFixedSizeArray<4, boolean>>;
    /**
     * A multi-dimensional table mapping boolean flags which will be true only
     * in the time tick the corresponding button changes it's state to pressed.
     * The table must be addressed with [column][row]
     * @remark A keypad is in size of [4, 4]
     */
    readonly ButtonsDown: ReadOnlyFixedSizeArray<4, ReadOnlyFixedSizeArray<4, boolean>>;
    /**
     * A multi-dimensional table mapping boolean flags which will be true only
     * in the time tick the corresponding button changes it's state to released.
     * The table must be addressed with [column][row]
     * @remark A keypad is in size of [4, 4]
     */
    readonly ButtonsUp: ReadOnlyFixedSizeArray<4, ReadOnlyFixedSizeArray<4, boolean>>;
    ButtonsInputSource: FixedSizeArray<4, FixedSizeArray<4, undefined>>;
    Symbols: undefined; // Symbol[][], the docs describe it, but accessing it is a RuntimeError
};

type Knob = MovingButton;

type LedButton = ClickButton & {
    /**
     * The lit/unlit state of the Led.
     */
    LedState: boolean;
    /**
     * The color of the Led.
     */
    LedColor: color;
    Symbol: undefined; // Symbol, the docs describe it, but accessing it is a RuntimeError
};

type ScreenButton = ClickButton & {
    /**
     * The videochip the screen part of this button is bound to.
     */
    VideoChip: VideoChip;
    Offset: vec2;
    Width: number;
    Height: number;
};

type Slider = MovingButton;

type Switch = __ModuleBrand & {
    /**
     * The state of this switch.
     */
    InputSource: InputSource;
    State: boolean;
    Symbol: undefined; // Symbol, the docs describe it, but accessing it is a RuntimeError
};

type Webcam = __ModuleBrand & {
    /**
     * The VideoChip this camera is streaming contents to.
     */
    RenderTarget: VideoChip;
    readonly AccessDenied: boolean;
    readonly IsActive: boolean;
    readonly IsAvailable: boolean;
    /**
     * Gets the camera RenderBuffer. The render buffer obtained can then be fed to the DrawRenderBuffer method of the VideoChip module.
     */
    GetRenderBuffer(): RenderBuffer;
};
