import React from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, Hidden, withStyles, Toolbar, Typography, IconButton,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  toolBar: {
    alignItems: 'center',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
  },
  titleBar: {
    position: 'static',
    [theme.breakpoints.up('sm')]: {
      position: 'fixed',
    },
  },
});

class Header extends React.Component {
  render() {
    const { classes, appTitle, openDrawer } = this.props;
    return (
      <div className={classes.root}>
        <AppBar color="primary">
          <Toolbar className={classes.toolBar}>
            <Typography variant="h5" color="inherit">
              {appTitle}
            </Typography>
            <Hidden mdUp>
              <IconButton onClick={openDrawer} color="inherit" aria-label="Open Menu">
                <MenuIcon />
              </IconButton>
            </Hidden>

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
