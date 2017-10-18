import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import App from './App';

import registerServiceWorker from './registerServiceWorker';
import customMuiThemeDesc from './custom-mui-theme';

const customTheme = getMuiTheme(customMuiThemeDesc);

const AppToRender = () => (
  <MuiThemeProvider muiTheme={customTheme}>
    <App />
  </MuiThemeProvider>
);

ReactDOM.render(<AppToRender />, document.getElementById('root'));
registerServiceWorker();
