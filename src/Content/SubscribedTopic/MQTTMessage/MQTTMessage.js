import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import theme from '../../../custom-mui-theme';

const styles = {
  container: {

  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '5px 5px'
  },
  body: {
  }
};

class componentName extends Component {
  render() {
    const { topicName, date, message } = this.props;

    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <span>{topicName}</span>
          <span>{moment(date).format('YYYY. MM. DD. - HH:mm:ss')}</span>
        </div>
        <div style={styles.body}>
          <pre
            style={{
              padding: '5px',
              border: '1px solid ' + theme.palette.borderColor,
              borderRadius: 'none',
              fontSize: '11px',
              // backgroundColor: '#F1F1F1'
            }}
          >
            {message}
          </pre>
        </div>
      </div>
    );
  }
}

componentName.propTypes = {
  topicName: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  message: PropTypes.string.isRequired
};

export default componentName;
