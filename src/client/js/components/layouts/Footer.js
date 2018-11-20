import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  withStyles,
  Typography,
} from '@material-ui/core';

const styles = {
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  bottomLine: {
    display: 'flex',
    justifyContent: 'center',
  },
};

class Footer extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Typography variant="subtitle2" color="inherit" className={classes.bottomLine}>
          <span>About this App</span>
        </Typography>
      </AppBar>);
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);
