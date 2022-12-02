
const buttonFns: Array<ClickButton> = []
const buttonStatus: boolean[] = []

// last 256 is event type
export const BUTTON_UP = 0x01
export const BUTTON_DOWN = 0x02

const combineButtonEvent = (eventType: number, buttonId: number) => {
    return buttonId * 256 + eventType
}

export const getEventType = (event: number) => {
    return event % 256
}

export const getButtonId = (event: number) => {
    return Math.floor(event / 256)
}

export const getButtonStatus = (buttonId: number) => {
    return buttonFns[buttonId].ButtonState
}

export const registerButton = (button: ClickButton) => {
    buttonFns.push(button)
    buttonStatus.push(false)
    return buttonFns.length - 1
}

export const queryEvent = () => {
    let events: number[] = []
    buttonFns.forEach((btn, index) => {
        let status = btn.ButtonState
        if (status != buttonStatus[index]) {
            if (status) {
                // press down
                events.push(combineButtonEvent(BUTTON_DOWN, index))
            } else {
                // release up
                events.push(combineButtonEvent(BUTTON_UP, index))
            }
            buttonStatus[index] = status
        }
    })
    return events
}
