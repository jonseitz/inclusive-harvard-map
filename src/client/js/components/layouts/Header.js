import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, withStyles, Toolbar, Typography, IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const styles = {
  root: {
    flexGrow: 1,
  },
  toolBar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
};

class Header extends React.Component {
  render() {
    const { classes, appTitle, openDrawer } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="secondary">
          <Toolbar className={classes.toolBar}>
            <IconButton onClick={openDrawer} color="inherit" aria-label="Open Menu">
              <MenuIcon />
            </IconButton>

            <Typography variant="h5" color="inherit">
              {appTitle}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  appTitle: PropTypes.string,
  openDrawer: PropTypes.func.isRequired,
};

Header.defaultProps = {
  appTitle: 'An Amazing App',
};

export default withStyles(styles)(Header);
