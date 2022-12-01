import { IntRange, WithLedStrip, WithSegmentDisplay } from "../../typedefs/helpers";

// board definition
type Board = Gadget & WithLedStrip<8> & WithSegmentDisplay<4>;
declare const gdt: Board;

// helper methods
const rshift = (x: number, by: number) => math.floor(x / math.pow(2, by));
const isOn = (value: number, theBit: IntRange<0, 8>) => (rshift(value, theBit) % 2) > 0;

const num = 1 << 32;



// constants
const LEDCount = 8;
const DisplayColor = ColorRGBA(0, 255, 0, 255);

// setup
for(let i = 0; i < 4; i++) {
    gdt.SegmentDisplay0.SetDigitColor(i + 1, DisplayColor);
}

// update loop
let accum = 0;
update = () => {
    accum  += gdt.CPU0!.DeltaTime;
    for(let i = 0; i < LEDCount; i++) {
        gdt.LedStrip0.States[i + 1] = isOn(accum * 2, i + 1 as IntRange<0, 8>);    
    }
    gdt.SegmentDisplay0.ShowDigit(2, math.floor(accum % 1000 / 100));
    gdt.SegmentDisplay0.ShowDigit(3, math.floor(accum % 100 / 10));
    gdt.SegmentDisplay0.ShowDigit(4, math.floor(accum % 10));
    accum %= 256;
}

