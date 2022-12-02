/*
 * Based on IntRange from here:
 * https://stackoverflow.com/a/39495173
 */
type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

/*
 * From:
 * https://gist.github.com/mstn/5f75651100556dbe30e405691471afe3
 */
/**
 * An array in a fixed size of `N` of type `T`
 */
type FixedSizeArray<N extends number, T> = {
    readonly [k in Enumerate<N>]: T;
} & { length: N };

/**
 * A read-only array in a fixed size of `N` of type `T`
 */
type ReadOnlyFixedSizeArray<N extends number, T> = FixedSizeArray<N, T> & Readonly<T[]>;


//https://stackoverflow.com/a/63918062
type PrependNextNum<A extends Array<unknown>> = A['length'] extends infer T ? ((t: T, ...a: A) => void) extends ((...x: infer X) => void) ? X : never : never;
type EnumerateInternal<A extends Array<unknown>, N extends number> = { 0: A, 1: EnumerateInternal<PrependNextNum<A>, N> }[N extends A['length'] ? 0 : 1];
export type Enumerate<N extends number> = EnumerateInternal<[], N> extends (infer E)[] ? E : never;
export type Range<FROM extends number, TO extends number> = Exclude<Enumerate<TO>, Enumerate<FROM>>;


/**
 * Gadget structured layout declarations
 */
declare function NumberedProperty<Name extends string, Count extends number>(): `${Name}${IntRange<0, Count>}`
type NumberedComponents<Component, Name extends string, Count extends number> = {[k in ReturnType<typeof NumberedProperty<Name, Count>>]: Component};
type NonNumberedCompontent<Component, Name extends string> = Record<Name, ROM>;

type WithSticks<Count extends number> = NumberedComponents<Stick, 'Stick', Count>;
type WithDpads<Count extends number> = NumberedComponents<Stick, 'Stick', Count>;
type WithKeypads<Count extends number> = NumberedComponents<Keypad, 'Keypad', Count>;
type WithKnobs<Count extends number> = NumberedComponents<Knob, 'Knob', Count>;
type WithLedButtons<Count extends number> = NumberedComponents<LedButton, 'LedButton', Count>;
type WithScreenButtons<Count extends number> = NumberedComponents<ScreenButton, 'ScreenButton', Count>;
type WithSliders<Count extends number> = NumberedComponents<Slider, 'Slider', Count>;
type WithSwitchs<Count extends number> = NumberedComponents<Switch, 'Switch', Count>;
type WithWebcams<Count extends number> = NumberedComponents<Webcam, 'Webcam', Count>;
type WithGauges<Count extends number> = NumberedComponents<Gauge, 'Gauge', Count>;
type WithLcds<Count extends number> = NumberedComponents<Lcd, 'Lcd', Count>;
type WithLeds<Count extends number> = NumberedComponents<Led, 'Led', Count>;
type WithLedMatrixes<Count extends number> = NumberedComponents<LedMatrix, 'LedMatrix', Count>;
type WithScreens<Count extends number> = NumberedComponents<Screen, 'Screen', Count>;
type WithSpeakers<Count extends number> = NumberedComponents<Speaker, 'Speaker', Count>;
type WithAudioChips<Count extends number> = NumberedComponents<AudioChip, 'AudioChip', Count>;
type WithCPUs<Count extends number> = NumberedComponents<CPU, 'CPU', Count>;
type WithDecorations<Count extends number> = NumberedComponents<Decoration, 'Decoration', Count>;
type WithFlashMemorys<Count extends number> = NumberedComponents<FlashMemory<any>, 'FlashMemory', Count>;
type WithTypedFlashMemorys<Count extends number, T> = NumberedComponents<FlashMemory<T>, 'FlashMemory', Count>;
type WithGamepadChips<Count extends number> = NumberedComponents<GamepadChip, 'GamepadChip', Count>;
type WithKeyboardChips<Count extends number> = NumberedComponents<KeyboardChip, 'KeyboardChip', Count>;
type WithMagneticConnectors<Count extends number> = NumberedComponents<MagneticConnector, 'MagneticConnector', Count>;
type WithPowerButtons<Count extends number> = NumberedComponents<PowerButton, 'PowerButton', Count>;
type WithRealityChips<Count extends number> = NumberedComponents<RealityChip, 'RealityChip', Count>;
// you can only access on ROM chip, which is always gdt['ROM']
// type WithROMs<Count extends number> = NumberedComponents<ROM, 'ROM', Count>;
type WithSecurityChips<Count extends number> = NumberedComponents<SecurityChip, 'SecurityChip', Count>;
type WithVideoChips<Count extends number> = NumberedComponents<VideoChip, 'VideoChip', Count>;
type WithWifis<Count extends number> = NumberedComponents<Wifi, 'Wifi', Count>;

// @todo: here a conditional type will be required to check for the layout of different sized components
type WithLedStrips<Count extends number, Size extends number> = NumberedComponents<LedStrip<Size>, 'LedStrip', Count>;
type WithSegmentDisplays<Count extends number, Size extends number> = NumberedComponents<SegmentDisplay<Size>, 'SegmentDisplay', Count>;


/**
 * Singular component additions
 */
type WithStick = NumberedComponents<Stick, 'Stick', 1>;
type WithDpad = NumberedComponents<Stick, 'Stick', 1>;
type WithKeypad = NumberedComponents<Keypad, 'Keypad', 1>;
type WithKnob = NumberedComponents<Knob, 'Knob', 1>;
type WithLedButton = NumberedComponents<LedButton, 'LedButton', 1>;
type WithScreenButton = NumberedComponents<ScreenButton, 'ScreenButton', 1>;
type WithSlider = NumberedComponents<Slider, 'Slider', 1>;
type WithSwitch = NumberedComponents<Switch, 'Switch', 1>;
type WithWebcam = NumberedComponents<Webcam, 'Webcam', 1>;
type WithGauge = NumberedComponents<Gauge, 'Gauge', 1>;
type WithLcd = NumberedComponents<Lcd, 'Lcd', 1>;
type WithLed = NumberedComponents<Led, 'Led', 1>;
type WithLedMatrixe = NumberedComponents<LedMatrix, 'LedMatrix', 1>;
type WithScreen = NumberedComponents<Screen, 'Screen', 1>;
type WithSpeaker = NumberedComponents<Speaker, 'Speaker', 1>;
type WithAudioChip = NumberedComponents<AudioChip, 'AudioChip', 1>;
type WithCPU = NumberedComponents<CPU, 'CPU', 1>;
type WithDecoration = NumberedComponents<Decoration, 'Decoration', 1>;
type WithFlashMemory = NumberedComponents<FlashMemory<any>, 'FlashMemory', 1>;
type WithTypedFlashMemory<T> = NumberedComponents<FlashMemory<T>, 'FlashMemory', 1>;
type WithGamepadChip = NumberedComponents<GamepadChip, 'GamepadChip', 1>;
type WithKeyboardChip = NumberedComponents<KeyboardChip, 'KeyboardChip', 1>;
type WithMagneticConnector = NumberedComponents<MagneticConnector, 'MagneticConnector', 1>;
type WithPowerButton = NumberedComponents<PowerButton, 'PowerButton', 1>;
type WithRealityChip = NumberedComponents<RealityChip, 'RealityChip', 1>;
type WithROM = NonNumberedCompontent<ROM, 'ROM'>;
type WithSecurityChip = NumberedComponents<SecurityChip, 'SecurityChip', 1>;
type WithVideoChip = NumberedComponents<VideoChip, 'VideoChip', 1>;
type WithWifi = NumberedComponents<Wifi, 'Wifi', 1>;

// @todo: here a conditional type will be required to check for the layout of different sized components
type WithLedStrip<Size extends number> = NumberedComponents<LedStrip<Size>, 'LedStrip', 1>;
type WithSegmentDisplay<Size extends number> = NumberedComponents<SegmentDisplay<Size>, 'SegmentDisplay', 1>;