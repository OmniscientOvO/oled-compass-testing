def on_button_pressed_a():
    OLED.clear()
    global CurrentOrient
    CurrentOrient = input.compass_heading()
    if CurrentOrient < 45:
        OLED.write_string_new_line("CurrentOrient:N")
    elif CurrentOrient < 135:
        OLED.write_string_new_line("CurrentOrient:E")
    elif CurrentOrient< 225:
        OLED.write_string_new_line("CurrentOrient:s")
    elif CurrentOrient < 315:
        OLED.write_string_new_line("CurrentOrient: W") 
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    OLED.clear()
    OLED.write_string_new_line("CurrentGasLevel:")
    OLED.write_num_new_line(pins.analog_read_pin(AnalogReadWritePin.P0))
input.on_button_pressed(Button.B, on_button_pressed_b)

def on_every_interval():
    CurrentAcceZ = input.acceleration(Dimension.Z)
    AcceZList.append(CurrentAcceZ)
loops.every_interval(500, on_every_interval)

def on_button_pressed_ab():
    OLED.clear()
    i = 0
    sum = 0
    OLED. write_string_new_line("CurrentAcceZ" + str(CurrentAcceZ))
    for elements in AcceZList:
        sum = AcceZList[i]+ AcceZList[i+1]
        i = i+2
    AverageAcceZ = sum/len(AcceZList)
    OLED.write_string_new_line("AverageAcceZ:" + str(AverageAcceZ))
input.on_button_pressed(Button.B, on_button_pressed_ab)
    
CurrentOrient = 0
CurrentGasLevel = 0
CurrentAcceZ = 0
AverageAcceZ = 0
AcceZList:List[number] = []
OLED.init(128, 64)
OLED.write_string_new_line("Satellite simulation start.")
OLED.write_string_new_line("Press buttons to view data.")