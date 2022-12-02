

/**
 * Collection of event payloads
 */
 type StickValueChangeEvent = {
    X: number,
    Y: number,
    Type: "StickValueChangeEvent"
};
type DPadValueChangeEvent = {
    X: number,
    Y: number,
    Type: "DPadValueChangeEvent"
};
type KeypadButtonEvent = {
    X: number,
    Y: number,
    ButtonDown: boolean,
    Type: "KeypadButtonEvent"
};
type KnobValueChangeEvent = {
    value: number,
    Type: "KnobValueChangeEvent"
};
type LedButtonEvent = {
    ButtonDown: boolean,
    ButtonUp: boolean,
    Type: "LedButtonEvent"
};
type ScreenButtonEvent = {
    ButtonDown: boolean,
    ButtonUp: boolean,
    Type: "ScreenButtonEvent"
};
type SliderValueChangeEvent = {
    Value: number,
    Type: "SliderValueChangeEvent"
};
type SwitchStateChangeEvent = {
    State: boolean,
    Type: "SwitchStateChangeEvent"
};

type WebcamIsActiveEvent = {
    IsActive: boolean,
    IsAvailable: boolean,
    AccessDenied: boolean,
    Type: "WebcamIsActiveEvent"
}

type KeyboardChipEvent = {
    ButtonDown: boolean,
    ButtonUp: boolean,
    InputName: KeyboardButtonName,
    Type: "KeyboardChipEvent"
}

type GamepadChipButtonEvent = {
    ButtonDown: boolean,
    ButtonUp: boolean,
    IsAxis: boolean,
    InputName: InputName,
    Type: "GamepadChipButtonEvent"
}

type GamepadChipIsActiveEvent = {
    IsActive: boolean,
    Type: "GamepadChipIsActiveEvent"
}

type WifiWebResponseEvent = {
    RequestHandle: number,
    ResponseCode: number,
    IsError: boolean,
    ErrorType: string,
    ErrorMessage: string,
    ContentType: string,
    Text: string,
    Type: "WifiWebResponseEvent"
}

type EventSources = Wifi |
    KeyboardChip |
    GamepadChip |
    Slider |
    ScreenButton |
    Knob |
    Keypad |
    DPad |
    Stick |
    Webcam;
type EventTypes = StickValueChangeEvent |
    DPadValueChangeEvent |
    KeypadButtonEvent |
    KnobValueChangeEvent |
    LedButtonEvent |
    ScreenButtonEvent |
    SliderValueChangeEvent |
    SwitchStateChangeEvent |
    WebcamIsActiveEvent | 
    KeyboardChipEvent |
    GamepadChipButtonEvent |
    GamepadChipIsActiveEvent |
    WifiWebResponseEvent;

type EventCallback = (sender: EventSources, arg: EventTypes) => any;
declare let eventChannel1: EventCallback;
declare let eventChannel2: EventCallback;
declare let eventChannel3: EventCallback;
declare let eventChannel4: EventCallback;
declare let eventChannel5: EventCallback;
declare let eventChannel6: EventCallback;
declare let eventChannel7: EventCallback;
declare let eventChannel8: EventCallback;
declare let eventChannel9: EventCallback;
declare let eventChannel10: EventCallback;
declare let eventChannel11: EventCallback;
declare let eventChannel12: EventCallback;
declare let eventChannel13: EventCallback;
declare let eventChannel14: EventCallback;
declare let eventChannel15: EventCallback;
declare let eventChannel16: EventCallback;
declare let eventChannel17: EventCallback;
declare let eventChannel18: EventCallback;
declare let eventChannel19: EventCallback;
declare let eventChannel20: EventCallback;
declare let eventChannel21: EventCallback;
declare let eventChannel22: EventCallback;
declare let eventChannel23: EventCallback;
declare let eventChannel24: EventCallback;
declare let eventChannel25: EventCallback;
declare let eventChannel26: EventCallback;
declare let eventChannel27: EventCallback;
declare let eventChannel28: EventCallback;
declare let eventChannel29: EventCallback;
declare let eventChannel30: EventCallback;
declare let eventChannel31: EventCallback;
declare let eventChannel32: EventCallback;
declare let eventChannel33: EventCallback;
declare let eventChannel34: EventCallback;
declare let eventChannel35: EventCallback;
declare let eventChannel36: EventCallback;
declare let eventChannel37: EventCallback;
declare let eventChannel38: EventCallback;
declare let eventChannel39: EventCallback;
declare let eventChannel40: EventCallback;
declare let eventChannel41: EventCallback;
declare let eventChannel42: EventCallback;
declare let eventChannel43: EventCallback;
declare let eventChannel44: EventCallback;
declare let eventChannel45: EventCallback;
declare let eventChannel46: EventCallback;
declare let eventChannel47: EventCallback;
declare let eventChannel48: EventCallback;
declare let eventChannel49: EventCallback;
declare let eventChannel50: EventCallback;
declare let eventChannel51: EventCallback;
declare let eventChannel52: EventCallback;
declare let eventChannel53: EventCallback;
declare let eventChannel54: EventCallback;
declare let eventChannel55: EventCallback;
declare let eventChannel56: EventCallback;
declare let eventChannel57: EventCallback;
declare let eventChannel58: EventCallback;
declare let eventChannel59: EventCallback;
declare let eventChannel60: EventCallback;
declare let eventChannel61: EventCallback;
declare let eventChannel62: EventCallback;
declare let eventChannel63: EventCallback;
declare let eventChannel64: EventCallback;

