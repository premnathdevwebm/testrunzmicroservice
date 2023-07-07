from pasco import PASCOBLEDevice

class EventEmitter:
    def __init__(self):
        self.listeners = {}

    def on(self, event, listener):
        if event in self.listeners:
            self.listeners[event].append(listener)
        else:
            self.listeners[event] = [listener]

    def emit(self, event, *args, **kwargs):
        if event in self.listeners:
            for listener in self.listeners[event]:
                listener(*args, **kwargs)

    def remove_listener(self, event, listener):
        if event in self.listeners:
            self.listeners[event].remove(listener)
            if len(self.listeners[event]) == 0:
                del self.listeners[event]

    def remove_all_listeners(self, event=None):
        if event:
            self.listeners.pop(event, None)
        else:
            self.listeners = {}

def temperature(temp):
    print(f"{temp}")



my_sensor = PASCOBLEDevice()
found_devices = my_sensor.scan()

print('\nDevices Found')
for i, ble_device in enumerate(found_devices):
    display_name = ble_device.name.split('>')
    print(f'{i}: {display_name}')

# Auto connect if only one sensor found
selected_device = input('Select a device: ') if len(found_devices) > 1 else 0

ble_device = found_devices[int(selected_device)]
my_sensor.connect(ble_device)

emitter = EventEmitter()
emitter.on('temperature', temperature)


# Loop that will read/display the data 100 times
for i in range(1000):
    current_temp = my_sensor.read_data('Temperature')
    current_unit = my_sensor.get_measurement_unit()
    emitter.emit('temperature', f'The current temp is {current_temp}: {current_unit}')

my_sensor.disconnect()