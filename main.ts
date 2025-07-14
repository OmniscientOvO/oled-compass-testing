input.onButtonPressed(Button.A, function on_button_pressed_a() {
    OLED.clear()
    
    CurrentOrient = input.compassHeading()
    if (CurrentOrient < 45) {
        OLED.writeStringNewLine("CurrentOrient:N")
    } else if (CurrentOrient < 135) {
        OLED.writeStringNewLine("CurrentOrient:E")
    } else if (CurrentOrient < 225) {
        OLED.writeStringNewLine("CurrentOrient:s")
    } else if (CurrentOrient < 315) {
        OLED.writeStringNewLine("CurrentOrient: W")
    }
    
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    OLED.clear()
    OLED.writeStringNewLine("CurrentGasLevel:")
    OLED.writeNumNewLine(pins.analogReadPin(AnalogReadWritePin.P0))
})
loops.everyInterval(500, function on_every_interval() {
    let CurrentAcceZ = input.acceleration(Dimension.Z)
    AcceZList.push(CurrentAcceZ)
})
input.onButtonPressed(Button.B, function on_button_pressed_ab() {
    OLED.clear()
    let i = 0
    let sum = 0
    OLED.writeStringNewLine("CurrentAcceZ" + ("" + CurrentAcceZ))
    for (let elements of AcceZList) {
        sum = AcceZList[i] + AcceZList[i + 1]
        i = i + 2
    }
    let AverageAcceZ = sum / AcceZList.length
    OLED.writeStringNewLine("AverageAcceZ:" + ("" + AverageAcceZ))
})
let CurrentOrient = 0
let CurrentGasLevel = 0
let CurrentAcceZ = 0
let AverageAcceZ = 0
let AcceZList : number[] = []
OLED.init(128, 64)
OLED.writeStringNewLine("Satellite simulation start.")
OLED.writeStringNewLine("Press buttons to view data.")
