
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