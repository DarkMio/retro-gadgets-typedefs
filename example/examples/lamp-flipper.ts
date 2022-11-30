let accum = 0;


const flipFlop = (value: number, flipInSeconds: number) => (math.floor(value / flipInSeconds) % 2) == 0 


function update() {
    accum  += gdt.CPU0!.DeltaTime
    gdt.Led0!.State = flipFlop(accum, 2)
    desk.SetLampState(flipFlop(accum, 5))
}