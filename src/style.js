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
    backgroundColor: '#00A1C9',
    display: 'flex'
  },
  headerLeft: {
    width: '150px',
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
    width: '150px',
    borderRight: '1px solid #cccccc',
    display: 'flex',
    flexDirection: 'column'
  },
  menuItem: {
    padding: '5px'
  },
  content: {
    flexGrow: 1
  }
};
