import theme from './custom-mui-theme';

export default {
  container: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'strech',
    height: '100%',
    padding: '10px',
    boxSizing: 'border-box'
  },
  inner: {
    width: '800px',
    display: 'flex',
    flexDirection: 'column'
  },
  header: {
    height: '50px',
    backgroundColor: theme.palette.primary1Color,
    display: 'flex'
  },
  headerLeft: {
    width: '200px',
    borderRight: '1px solid white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white'
  },
  headerRight: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexGrow: 1,
    alignItems: 'center',
    color: 'white'
  },
  bottom: {
    flexGrow: 1,
    display: 'flex'
  },
  menu: {
    width: '200px',
    borderRight: '1px solid #cccccc',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
  },
  menuItem: {
    padding: '5px'
  },
  content: {
    flexGrow: 1,
    padding: '8px'
  }
};
