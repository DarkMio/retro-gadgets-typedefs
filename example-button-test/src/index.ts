// define hardware
declare type _Gadget = Gadget & {
    VideoChip0: VideoChip,
    LedButton0: LedButton,
    LedButton1: LedButton,
    LedButton2: LedButton,
    LedButton3: LedButton,
    LedButton4: LedButton,
    LedButton5: LedButton,
}
declare const gdt: _Gadget;

// Retro Gadgets
import { registerButton, queryEvent, getEventType, getButtonId, getButtonStatus } from "./button"
import { BUTTON_DOWN, BUTTON_UP } from "./button"

const BG:color = color.black
const FG:color = color.white
const btnl = registerButton(gdt.LedButton5)
const btnr = registerButton(gdt.LedButton4)
const btna = registerButton(gdt.LedButton2)
const btnb = registerButton(gdt.LedButton1)

const vid = gdt.VideoChip0
const lt = vec2(0, 0)
const lb = vec2(0, vid.Height)
const rt = vec2(vid.Width, 0)
const rb = vec2(vid.Width, vid.Height)

function update() {
    const events = queryEvent()
    for (const event of events) {
        const et = getEventType(event)
        const bid = getButtonId(event)
        const status = getButtonStatus(bid)
        let rectColor = FG
        if (et === BUTTON_DOWN) {
            print("Button", bid, "Pressed!")
            rectColor = FG
        } else if (et === BUTTON_UP) {
            print("Button", bid, "Released!")
            rectColor = BG
        }
        let p = rb
        let q = rb
        switch (bid) {
            case btnl:
                p = vec2(lb.X + 1, lb.Y)
                vid.FillRect(lt, p, rectColor)
                break;
            case btnr:
                p = vec2(rt.X - 2, rt.Y)
                vid.FillRect(p, rb, rectColor)
                break;
            case btna:
                p = vec2(lb.X, lb.Y - 2)
                q = vec2(lb.X + (vid.Width / 2) - 1, lb.Y)
                vid.FillRect(p, q, rectColor)
                break;
            case btnb:
                p = vec2(rb.X - (vid.Width / 2), rb.Y - 2)
                vid.FillRect(p, rb, rectColor)
                break;
        
            default:
                break;
        }
    }
}
