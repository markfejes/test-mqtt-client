import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';
import Publisher from '../Publisher/Publisher';
import MQTTMessage from './MQTTMessage/MQTTMessage';

const styles = {
  container: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  messageContainer: {
    overflow: 'auto',
    flexGrow: 1
  }
};

class SubscribedTopic extends Component {
  render() {
    const { publishFunc, topicName, messages, clearMessages } = this.props;

    return (
      <div style={styles.container}>
        <Publisher publishFunc={publishFunc} topicName={topicName} />
        <div style={styles.messageContainer}>
          { messages.map(message => (
            <MQTTMessage
              key={message.date}
              topicName={topicName}
              date={message.date}
              message={message.data}
            />))
        }
        </div>
        <RaisedButton
          label="Delete messages"
          secondary
          onClick={() => {
            clearMessages(topicName);
          }}
        />
      </div>
    );
  }
}

SubscribedTopic.propTypes = {
  publishFunc: PropTypes.func.isRequired,
  topicName: PropTypes.string.isRequired,
  messages: PropTypes.array.isRequired,
  clearMessages: PropTypes.func.isRequired
};

export default SubscribedTopic;
