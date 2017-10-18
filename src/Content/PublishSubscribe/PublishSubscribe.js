import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

import styles from './style';

class Publish extends Component {
  render() {
    return (
      <div style={styles.container}>
        <div style={styles.subscribe}>
          <span>Subscrine to topic</span>
          <div style={styles.subscribeBlock}>
            <TextField
              style={{
                marginRight: '10px'
              }}
            />
            <RaisedButton label="Subscribe" primary onClick={() => toast('helllllo', {         className: 'dark-toast',
        progressClassName: 'transparent-progress',
        autoClose: 5000})} />
          </div>
        </div>
        <Divider />
        <div style={styles.publish}>
          Publish to topic
        </div>
      </div>
    );
  }
}

Publish.propTypes = {

};

export default Publish;
