from flask import Flask, jsonify, render_template
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from threading import Thread
from pasco import PASCOBLEDevice
import time

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app)

# Create a PASCOBLEDevice instance
my_sensor = PASCOBLEDevice()

# Event listener function for temperature data
def temperature_thread():
    while True:
        try:
            # Read temperature data from the sensor
            current_temp = my_sensor.read_data('Temperature')
            print("-->", current_temp)

            # Emit the temperature data through the WebSocket connection
            socketio.emit('temperature', {'temperature': current_temp})
        except Exception as e:
            print(f"Measurement error: {e}")

        # Sleep for some time before reading again
        # Adjust the sleep duration as per your requirement
        time.sleep(1)

# Route to retrieve temperature data
@app.route('/data')
def get_data():
    try:
        # Read temperature data from the sensor
        current_temp = my_sensor.read_data('Temperature')
        print("-->", current_temp)
        # Emit the temperature data through the WebSocket connection
        socketio.emit('temperature', {'temperature': current_temp})

        # Return the temperature data as JSON
        return jsonify({'temperature': current_temp})
    except Exception as e:
        return jsonify({'error': f"Measurement error: {e}"}), 400

# Route for index page
@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    # Scan for PASCO BLE devices and connect to the first device found
    found_devices = my_sensor.scan()
    if len(found_devices) > 0:
        my_sensor.connect(found_devices[0])
    else:
        print("No PASCO BLE devices found.")

    # Start the temperature thread
    temperature_thread = Thread(target=temperature_thread)
    temperature_thread.start()

    # Run the Flask application with SocketIO
    socketio.run(app, debug=True)
