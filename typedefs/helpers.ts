/// Helpers
/// They should not be exposed as type-declaration, as they're not part of the game
/// their purpose is to enhance the type declaration of features and/or employ type guards where possible
///
/// Import them in type definitions if necessary 


/// Based on IntRange from here:
/// https://stackoverflow.com/a/39495173
type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

export type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

/// From:
/// https://gist.github.com/mstn/5f75651100556dbe30e405691471afe3
/**
 * An array in a fixed size of `N` of type `T`
 */
export type FixedSizeArray<N extends number, T> = {
  readonly [k in Enumerate<N>]: T;
} & { length: N };

/**
 * A read-only array in a fixed size of `N` of type `T`
 */
export type ReadOnlyFixedSizeArray<N extends number, T> = FixedSizeArray<N, T> & Readonly<T[]>;


//https://stackoverflow.com/a/63918062
/*
type PrependNextNum<A extends Array<unknown>> = A['length'] extends infer T ? ((t: T, ...a: A) => void) extends ((...x: infer X) => void) ? X : never : never;
type EnumerateInternal<A extends Array<unknown>, N extends number> = { 0: A, 1: EnumerateInternal<PrependNextNum<A>, N> }[N extends A['length'] ? 0 : 1];
export type Enumerate<N extends number> = EnumerateInternal<[], N> extends (infer E)[] ? E : never;
*/
type Range<FROM extends number, TO extends number> = Exclude<Enumerate<TO>, Enumerate<FROM>>;


/// Gadget Structured Layout Declarations
/// Helper-Types to quickly declare the properties found in a gadget dependent on the components added to it
/**
 * Declares property keys to a type in `${Name}{Count}`
 * @template Name is the prepended name of the property key
 * @template Count is the appended count of the property key
 */
declare function NumberedProperty<Name extends string, Count extends number>(): `${Name}${IntRange<0, Count>}`;
/// Generic helper to add { name0: { ... } }
type NumberedComponents<Component, Name extends string, Count extends number> = { [k in ReturnType<typeof NumberedProperty<Name, Count>>]: Component };
/// Generic helper to add { name:  { ... } }
type NonNumberedCompontent<Component, Name extends string> = Record<Name, Component>;

/// All components that have been added 1-N times
export type WithSticks<Count extends number> = NumberedComponents<Stick, 'Stick', Count>;
export type WithDpads<Count extends number> = NumberedComponents<Stick, 'Stick', Count>;
export type WithKeypads<Count extends number> = NumberedComponents<Keypad, 'Keypad', Count>;
export type WithKnobs<Count extends number> = NumberedComponents<Knob, 'Knob', Count>;
export type WithLedButtons<Count extends number> = NumberedComponents<LedButton, 'LedButton', Count>;
export type WithScreenButtons<Count extends number> = NumberedComponents<ScreenButton, 'ScreenButton', Count>;
export type WithSliders<Count extends number> = NumberedComponents<Slider, 'Slider', Count>;
export type WithSwitchs<Count extends number> = NumberedComponents<Switch, 'Switch', Count>;
export type WithWebcams<Count extends number> = NumberedComponents<Webcam, 'Webcam', Count>;
export type WithGauges<Count extends number> = NumberedComponents<Gauge, 'Gauge', Count>;
export type WithLcds<Count extends number> = NumberedComponents<Lcd, 'Lcd', Count>;
export type WithLeds<Count extends number> = NumberedComponents<Led, 'Led', Count>;
export type WithLedMatrixes<Count extends number> = NumberedComponents<LedMatrix, 'LedMatrix', Count>;
export type WithScreens<Count extends number> = NumberedComponents<Screen, 'Screen', Count>;
export type WithSpeakers<Count extends number> = NumberedComponents<Speaker, 'Speaker', Count>;
export type WithAudioChips<Count extends number> = NumberedComponents<AudioChip, 'AudioChip', Count>;
export type WithCPUs<Count extends number> = NumberedComponents<CPU, 'CPU', Count>;
export type WithDecorations<Count extends number> = NumberedComponents<Decoration, 'Decoration', Count>;
export type WithFlashMemorys<Count extends number> = NumberedComponents<FlashMemory<any>, 'FlashMemory', Count>;
export type WithTypedFlashMemorys<Count extends number, T> = NumberedComponents<FlashMemory<T>, 'FlashMemory', Count>;
export type WithGamepadChips<Count extends number> = NumberedComponents<GamepadChip, 'GamepadChip', Count>;
export type WithKeyboardChips<Count extends number> = NumberedComponents<KeyboardChip, 'KeyboardChip', Count>;
export type WithMagneticConnectors<Count extends number> = NumberedComponents<MagneticConnector, 'MagneticConnector', Count>;
export type WithPowerButtons<Count extends number> = NumberedComponents<PowerButton, 'PowerButton', Count>;
export type WithRealityChips<Count extends number> = NumberedComponents<RealityChip, 'RealityChip', Count>;
/// you can only access on ROM chip, which is always gdt['ROM']
/// export type WithROMs<Count extends number> = NumberedComponents<ROM, 'ROM', Count>;
export type WithSecurityChips<Count extends number> = NumberedComponents<SecurityChip, 'SecurityChip', Count>;
export type WithVideoChips<Count extends number> = NumberedComponents<VideoChip, 'VideoChip', Count>;
export type WithWifis<Count extends number> = NumberedComponents<Wifi, 'Wifi', Count>;
/// @todo: here a conditional type will be required to check for the layout of different sized components
/// for example (WithLedStrips<2, 4> & WithLedStrips<2, 4>) declares the type as { LedStrip0: { ... }, LedStrip1: { ... } }
/// essentially missing LedStrip2, LedStrip3
export type WithLedStrips<Count extends number, Size extends number> = NumberedComponents<LedStrip<Size>, 'LedStrip', Count>;
export type WithSegmentDisplays<Count extends number, Size extends number> = NumberedComponents<SegmentDisplay<Size>, 'SegmentDisplay', Count>;

/// All components that are only added once to a gadget
export type WithStick = NumberedComponents<Stick, 'Stick', 1>;
export type WithDpad = NumberedComponents<Stick, 'Stick', 1>;
export type WithKeypad = NumberedComponents<Keypad, 'Keypad', 1>;
export type WithKnob = NumberedComponents<Knob, 'Knob', 1>;
export type WithLedButton = NumberedComponents<LedButton, 'LedButton', 1>;
export type WithScreenButton = NumberedComponents<ScreenButton, 'ScreenButton', 1>;
export type WithSlider = NumberedComponents<Slider, 'Slider', 1>;
export type WithSwitch = NumberedComponents<Switch, 'Switch', 1>;
export type WithWebcam = NumberedComponents<Webcam, 'Webcam', 1>;
export type WithGauge = NumberedComponents<Gauge, 'Gauge', 1>;
export type WithLcd = NumberedComponents<Lcd, 'Lcd', 1>;
export type WithLed = NumberedComponents<Led, 'Led', 1>;
export type WithLedMatrixe = NumberedComponents<LedMatrix, 'LedMatrix', 1>;
export type WithScreen = NumberedComponents<Screen, 'Screen', 1>;
export type WithSpeaker = NumberedComponents<Speaker, 'Speaker', 1>;
export type WithAudioChip = NumberedComponents<AudioChip, 'AudioChip', 1>;
export type WithCPU = NumberedComponents<CPU, 'CPU', 1>;
export type WithDecoration = NumberedComponents<Decoration, 'Decoration', 1>;
export type WithFlashMemory = NumberedComponents<FlashMemory<any>, 'FlashMemory', 1>;
export type WithTypedFlashMemory<T> = NumberedComponents<FlashMemory<T>, 'FlashMemory', 1>;
export type WithGamepadChip = NumberedComponents<GamepadChip, 'GamepadChip', 1>;
export type WithKeyboardChip = NumberedComponents<KeyboardChip, 'KeyboardChip', 1>;
export type WithMagneticConnector = NumberedComponents<MagneticConnector, 'MagneticConnector', 1>;
export type WithPowerButton = NumberedComponents<PowerButton, 'PowerButton', 1>;
export type WithRealityChip = NumberedComponents<RealityChip, 'RealityChip', 1>;
export type WithROM = NonNumberedCompontent<ROM, 'ROM'>;
export type WithSecurityChip = NumberedComponents<SecurityChip, 'SecurityChip', 1>;
export type WithVideoChip = NumberedComponents<VideoChip, 'VideoChip', 1>;
export type WithWifi = NumberedComponents<Wifi, 'Wifi', 1>;
/// @todo: here a conditional export type will be required to check for the layout of different sized components
export type WithLedStrip<Size extends number> = NumberedComponents<LedStrip<Size>, 'LedStrip', 1>;
export type WithSegmentDisplay<Size extends number> = NumberedComponents<SegmentDisplay<Size>, 'SegmentDisplay', 1>;
