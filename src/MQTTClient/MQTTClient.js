import mqtt from 'mqtt';

class MQTTCLient {
  constructor() {
    this.mqttClient = null;
  }

  connect(address, options) {
    const _address = address ? address : 'mqtt://127.0.0.1:3300';
    const _defaultOptions = {
      reconnectPeriod: 5000
    };

    const currentOptions = Object.assign({}, _defaultOptions, options);

    this.mqttClient = mqtt.connect(_address, currentOptions);

    this.mqttClient.on('connect', () => {
      console.log('connected');
    });

    this.mqttClient.on('reconnect', () => {
      console.log('reconnecting');
    });

    // this.mqttClient.on('close', () => {
    //   this.setState({
    //     connectionStatus: CONNECTION_STATUS.DISCONNECTED
    //   });
    // });

    this.mqttClient.on('offline', () => {
      console.log('disconnected');
    });

    this.mqttClient.on('message', (topic, message) => {
      // message is Buffer
      console.log(message.toString());
    });

    this.mqttClient.on('error', (error) => {
      // message is Buffer
      console.error(error);
    });

    this.mqttClient.on('packetsend', (packet) => {
      // message is Buffer
      console.log('packet send:');
      console.log(packet);
    });

    this.mqttClient.on('packetreceive', (packet) => {
      // message is Buffer
      console.log('packet receive');
      console.log(packet);
    });
  }

  subscribe(topic, callback) {
    this.mqttClient.subscribe(topic, callback);
  }

  publish(topic, message) {
    this.mqttClient.publish(topic, message);
  }

  getClient() {
    return this.mqttClient;
  }
}

// mqtt client should be singleton
const mqttClient = new MQTTCLient();
export default mqttClient;
