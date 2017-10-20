import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

import AceEditor from 'react-ace';
import 'brace/ext/language_tools';
import 'brace/mode/json';
import 'brace/theme/github';

import styles from './style';

class Publisher extends Component {
  constructor(props) {
    super(props);

    const { topicName } = this.props;

    const publishTopicName = topicName ? topicName : 'test_topic';

    this.state = {
      publishTopicName,
      publishContent: '{\n\t"attr1": 12,\n\t"attr2": "hello"\n}'
    };
  }

  componentWillReceiveProps(nextProps) {
    const { currentTopicName } = this.state;
    const { topicName } = nextProps;

    if (currentTopicName !== topicName) {
      this.setState({
        publishTopicName: topicName
      });
    }
  }

  render() {
    const { publishTopicName, publishContent } = this.state;
    const { publishFunc } = this.props;

    return (
      <div>
        <span>Publish to topic</span>
        <div style={styles.publish}>
          <div style={styles.subscribeBlock}>
            <TextField
              id="publish_topic_name"
              style={{
                marginRight: '10px'
              }}
              value={publishTopicName}
              onChange={(event) => { this.setState({ publishTopicName: event.target.value }); }}
              onKeyDown={(event) => { if (event.key === 'Enter') { publishFunc(publishTopicName, publishContent); } }}
            />
            <RaisedButton label="Publish" primary onClick={() => { publishFunc(publishTopicName, publishContent); }} />
          </div>
          <AceEditor
            mode="json"
            theme="github"
            height="150px"
            onChange={(value) => { this.setState({ publishContent: value }); }}
            value={publishContent}
            name="UNIQUE_ID_OF_DIV"
          />
        </div>
      </div>
    );
  }
}

Publisher.propTypes = {
  publishFunc: PropTypes.func.isRequired,
  topicName: PropTypes.string
};

export default Publisher;
