import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  Drawer,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  withStyles,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

const drawerWidth = 240;

const styles = (theme) => {
  return {
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing.unit * 7,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing.unit * 9,
      },
    },
    menuButton: theme.mixins.toolbar,
  };
};

class Menu extends React.Component {
  render() {
    const {
      children, classes, isDrawerOpen, closeDrawer,
    } = this.props;
    return (
      <Drawer
        open={isDrawerOpen}
        classes={{
          paper:
            classNames(
              classes.drawerPaper,
              !isDrawerOpen && classes.drawerPaperClose
            ),
        }}
      >
        <ListItem
          button
          component="button"
          onClick={closeDrawer}
          className={classes.menuButton}
        >
          <ListItemIcon>
            <Close />
          </ListItemIcon>
          <ListItemText primary="Close Menu" />
        </ListItem>
        <Divider />
        {children.map((child) => {
          return (
            <React.Fragment key={child.props.id}>
              {child}
              <Divider />
            </React.Fragment>
          );
        })}
      </Drawer>
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
