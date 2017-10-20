import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';

import Publisher from '../Publisher/Publisher';

import styles from './style';

class Publish extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subscribeTopicText: 'test_topic'
    };
  }

  render() {
    const { subscribeTopicText } = this.state;
    const { publishFunc, subscribeFunc } = this.props;

    return (
      <div style={styles.container}>
        <div style={styles.subscribe}>
          <span>Subscribe to topic</span>
          <div style={styles.subscribeBlock}>
            <TextField
              id="subscribe_topic_name"
              style={{
                marginRight: '10px'
              }}
              value={subscribeTopicText}
              onChange={(event) => { this.setState({ subscribeTopicText: event.target.value }); }}
              onKeyDown={(event) => { if (event.key === 'Enter') { subscribeFunc(subscribeTopicText); } }}
            />
            <RaisedButton label="Subscribe" primary onClick={() => { subscribeFunc(subscribeTopicText); }} />
          </div>
        </div>
        <Divider style={{ marginBottom: '8px' }} />
        <Publisher publishFunc={publishFunc} />
      </div>
    );
  }
}

Publish.propTypes = {
  subscribeFunc: PropTypes.func.isRequired,
  publishFunc: PropTypes.func.isRequired
};

export default Publish;
