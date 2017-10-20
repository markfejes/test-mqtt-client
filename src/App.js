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
// Components
import { PublishSubscribe, SubscribedTopic } from './Content';
// style
import styles from './style';
import './custom-toast.css';

import mqttClient from './MQTTClient/MQTTClient';

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
      contentPage: CONTENT_PAGE.PUBLISH_SUBSCRIBE,
      selectedSubscribedTopic: '',
      subscribedTopics: [],
      messages: {}
    };

    this.mqttClient = null;
  }

  componentDidMount() {
    mqttClient.connect('mqtt://127.0.0.1:3300');
    const client = mqttClient.getClient();

    client.on('connect', () => {
      this.setState({ connectionStatus: CONNECTION_STATUS.CONNECTED });
    });

    client.on('reconnect', () => {
      this.setState({ connectionStatus: CONNECTION_STATUS.RECONNECTING });
    });

    client.on('offline', () => {
      this.setState({ connectionStatus: CONNECTION_STATUS.DISCONNECTED });
    });
  }

  subscribeToTopic(topic) {
    mqttClient.subscribe(topic, (err, granted) => {
      if (!err && granted.length > 0) {
        toast(`Subscribed to topic: "${topic}"`, {
          className: 'dark-toast',
          progressClassName: 'transparent-progress',
          autoClose: 5000
        });
        this.setState({
          subscribedTopics: [...this.state.subscribedTopics, topic],
          // switch content page
          contentPage: CONTENT_PAGE.SUBSCRIBED_TOPIC,
          selectedSubscribedTopic: topic,
          messages: {
            ...this.state.messages,
            [topic]: []
          }
        });
        // subscribe to message event
        const client = mqttClient.getClient();
        client.on('message', (topicMsgIn, message) => {
          if (topic === topicMsgIn) {
            this.setState({
              ...this.state.messages,
              messages: {
                [topic]: [{
                  date: Date.now(),
                  data: message.toString()
                }, ...this.state.messages[topic]]
              }
            });
          }
        });
      }
    });
  }

  publishToTopic(topic, message) {
    mqttClient.publish(topic, message);
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
    const { contentPage, selectedSubscribedTopic, messages } = this.state;

    switch (contentPage) {
      case CONTENT_PAGE.PUBLISH_SUBSCRIBE:
        return (
          <PublishSubscribe
            subscribeFunc={this.subscribeToTopic.bind(this)}
            publishFunc={this.publishToTopic.bind(this)}
          />
        );
      case CONTENT_PAGE.SUBSCRIBED_TOPIC:
        return (
          <SubscribedTopic
            publishFunc={this.publishToTopic.bind(this)}
            topicName={selectedSubscribedTopic}
            messages={messages[selectedSubscribedTopic]}
          />
        );
      default:
        return null;
    }
  }

  render() {
    const { contentPage, subscribedTopics, selectedSubscribedTopic } = this.state;

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
                  onClick={() => { this.setState({ contentPage: CONTENT_PAGE.PUBLISH_SUBSCRIBE }); }}
                />
                <Divider />
                {
                  subscribedTopics.map(subscribedTopic => (
                    <MenuItem
                      key={subscribedTopic}
                      primaryText={subscribedTopic}
                      style={{
                        backgroundColor: (contentPage === CONTENT_PAGE.SUBSCRIBED_TOPIC) && (selectedSubscribedTopic === subscribedTopic) ?
                          'rgba(0, 0, 0, 0.2)' : null
                      }}
                      onClick={() => {
                        this.setState({
                          contentPage: CONTENT_PAGE.SUBSCRIBED_TOPIC,
                          selectedSubscribedTopic: subscribedTopic
                        });
                      }}
                    />
                  ))
                }
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
