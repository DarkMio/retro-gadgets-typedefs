import { WithLeds } from "../../typedefs/helpers";

const LEDCount = 5;
type Board = Gadget & WithLeds<typeof LEDCount>;
declare const gdt: Board;

const flipFlop = (value: number, flipInSeconds: number) => (math.floor(value / flipInSeconds) % 2) == 0 

let accum = 0;
update = () => {
    accum  += gdt.CPU0!.DeltaTime;
    let indexer = 0;
    for (let key in gdt) {
        let value: MultitoolConnector | PowerButton | Led  = gdt[key];
        if('State' in value) {
            value.State = flipFlop(accum, indexer + 1);
        }
        indexer += 1;
    }
    desk.SetLampState(flipFlop(accum, 5))
}