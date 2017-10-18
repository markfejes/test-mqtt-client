import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import SettingsIcon from 'material-ui/svg-icons/action/settings';

import styles from './style';

const CONNECTION_STATUS = {
  DISCONNECTED: 'DISCONNECTED',
  CONNECTED: 'CONNECTED',
  RECONNECTING: 'RECONNECTING'
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      connectionStatus: CONNECTION_STATUS.DISCONNECTED
    };
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

  render() {
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
              <span style={styles.menuItem}>Publish</span>
              <span style={styles.menuItem}>Subscribe</span>
              <Divider />
            </div>
            <div style={styles.content}>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default App;
