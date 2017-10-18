import React, { Component } from 'react';
// react Components
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
// other third parties
import mqtt from 'mqtt';
// Components
import { PublishSubscribe, SubscribedTopic } from './Content';
// style
import styles from './style';
import './custom-toast.css';

const CONNECTION_STATUS = {
  DISCONNECTED: 'DISCONNECTED',
  CONNECTED: 'CONNECTED',
  RECONNECTING: 'RECONNECTING'
};

const CONTENT_PAGE = {
  PUBLISH_SUBSCRIBE: 'PUBLISH_SUBSCRIBE',
  SUBSCRIBED_TOPIC: 'SUBSCRIBED_TOPIC'
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      connectionStatus: CONNECTION_STATUS.DISCONNECTED,
      contentPage: CONTENT_PAGE.PUBLISH_SUBSCRIBE
    };

    this.mqttClient = null;
  }

  componentDidMount() {
    this.mqttClient = mqtt.connect('mqtt://127.0.0.1:3300', {
      reconnectPeriod: 5000
    });
    // this.mqttClient = mqtt.connect('mqtt://test.mosquitto.org');

    this.mqttClient.on('connect', () => {
      this.setState({
        connectionStatus: CONNECTION_STATUS.CONNECTED
      });
      this.mqttClient.subscribe('test_topic');
      this.mqttClient.publish('test_topi', 'Hello mqtt buddies');
    });

    this.mqttClient.on('reconnect', () => {
      this.setState({
        connectionStatus: CONNECTION_STATUS.RECONNECTING
      });
    });

    // this.mqttClient.on('close', () => {
    //   this.setState({
    //     connectionStatus: CONNECTION_STATUS.DISCONNECTED
    //   });
    // });

    this.mqttClient.on('offline', () => {
      this.setState({
        connectionStatus: CONNECTION_STATUS.DISCONNECTED
      });
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

  renderConnectionStatus() {
    const { connectionStatus } = this.state;
    let statusText;

    switch (connectionStatus) {
      case CONNECTION_STATUS.CONNECTED:
        statusText = 'Connected';
        break;
      case CONNECTION_STATUS.DISCONNECTED:
        statusText = 'Disconnected';
        break;
      case CONNECTION_STATUS.RECONNECTING:
        statusText = 'Reconnecting';
        break;
      default:
        statusText = 'Unknown';
        break;
    }
    return (<span style={{ marginRight: '5px' }}>{statusText}</span>);
  }

  renderContent() {
    const { contentPage } = this.state;

    switch (contentPage) {
      case CONTENT_PAGE.PUBLISH_SUBSCRIBE:
        return <PublishSubscribe />;
      case CONTENT_PAGE.SUBSCRIBED_TOPIC:
        return <SubscribedTopic />;
      default:
        return null;
    }
  }

  render() {
    const { contentPage } = this.state;

    return (
      <div style={styles.container}>
        <Paper style={styles.inner}>
          <div style={styles.header}>
            <div style={styles.headerLeft}>
              <span>MQTT Test Client</span>
            </div>
            <div style={styles.headerRight}>
              {this.renderConnectionStatus()}
              <IconButton tooltip="Connection settings">
                <SettingsIcon color="white" />
              </IconButton>
            </div>
          </div>
          <div style={styles.bottom}>
            <div style={styles.menu}>
              <Menu style={{ width: '100%' }}>
                <MenuItem
                  primaryText="Subscribe / Publish"
                  style={{
                    backgroundColor: contentPage === CONTENT_PAGE.PUBLISH_SUBSCRIBE ? 'rgba(0, 0, 0, 0.2)' : null
                  }}
                  onClick={() => { this.setState({ contentPage: CONTENT_PAGE.PUBLISH_SUBSCRIBE }); toast('hello'); }}
                />
                <Divider />
              </Menu>
            </div>
            <div style={styles.content}>
              {this.renderContent()}
            </div>
          </div>
        </Paper>
        <ToastContainer
          position="top-right"
          type="default"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
        />
      </div>
    );
  }
}

export default App;
