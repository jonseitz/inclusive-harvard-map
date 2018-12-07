import React from 'react';
import PropTypes from 'prop-types';
import {
  Drawer,
  Divider,
  Hidden,
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

const styles = (theme) => {
  return {
    drawer: {
      width: theme.drawer.width,
      flexShrink: 0,
    },
    drawerPaper: {
      zIndex: theme.zIndex.appBar - 50,
      width: theme.drawer.width,
    },
    menuSpacer: {
      ...theme.mixins.toolbar,
      background: theme.palette.secondary.main,
    },
  };
};

class Menu extends React.Component {
  render() {
    const {
      children, classes, isDrawerOpen, closeDrawer,
    } = this.props;
    return (
      <React.Fragment>
        <Hidden smDown implementation="js">
          <Drawer
            variant="permanent"
            classes={{
              paper:
              classes.drawerPaper,
            }}
          >
            <ListItem
              component="div"
              className={classes.menuSpacer}
            />
            {children}
          </Drawer>
        </Hidden>
        <Hidden mdUp implementation="js">
          <Drawer
            open={isDrawerOpen}
            variant="temporary"
            onClose={closeDrawer}
            classes={{
              paper: classes.drawerPaper,
            }}
            modalprops={{
              keepMounted: true,
            }}
          >
            <ListItem
              button
              component="button"
              onClick={closeDrawer}
              className={classes.menuSpacer}
            >
              <ListItemIcon>
                <Close />
              </ListItemIcon>
              <ListItemText primary="Close Menu" />
            </ListItem>
            <Divider />
            {children}
          </Drawer>

        </Hidden>
      </React.Fragment>
    );
  }
}

Menu.propTypes = {
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  classes: PropTypes.object.isRequired,
  isDrawerOpen: PropTypes.bool,
  closeDrawer: PropTypes.func.isRequired,
};

Menu.defaultProps = {
  isDrawerOpen: false,
};

export default withStyles(styles)(Menu);
