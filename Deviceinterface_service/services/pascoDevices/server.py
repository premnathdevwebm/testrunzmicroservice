from flask import Flask, Response
from pasco import PASCOBLEDevice
import json

app = Flask(__name__)

temp_sensor = PASCOBLEDevice()
temp_sensor.connect_by_id('823-764')
temp_sensor.keepalive()

def generate():
    # Your data source here (e.g. a database or an API)
    for i in range(10):
        yield json.dumps({'temp': temp_sensor.read_data('Temperature'), 'id': 'item {}'.format(i)})

@app.route('/sream', methods=['GET'])
def stream():
    return Response(generate(), mimetype='application/json')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=7000)