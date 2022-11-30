let accum = 0;

function update() {
    accum  += gdt.CPU0!.DeltaTime
    // every roughly 5 seconds
    if(accum > 5) {
        desk.SetLampState(!desk.GetLampState())
        // reset stable timer
        accum = accum % 5
    }
}