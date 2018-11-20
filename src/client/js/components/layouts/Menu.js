import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  Drawer,
  Divider,
  withStyles,
} from '@material-ui/core';
// import Typography from '@material-ui/core/Typography';

const drawerWidth = 240;

const classes = (theme) => {
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
  };
};

class Menu extends React.Component {
  render() {
    const { isDrawerOpen, closeDrawer } = this.props;
    return (
      <Drawer
        open={isDrawerOpen}
        classes={{
          paper:
            classNames(
              classes.drawerPaper,
              !isDrawerOpen && classes.drawerPaperClose
            ),
        }
        }
      >
        <List>
          <ListItem>
            <ListItemIcon />
              Buildings
          </ListItem>
          <ListItem>
            <ListItemIcon />
              Directions
          </ListItem>
        </List>
        <Divider />
        <Button onClick={closeDrawer}>close</Button>
      </Drawer>
    );
  }
}

Menu.propTypes = {
  isDrawerOpen: PropTypes.bool,
  closeDrawer: PropTypes.func.isRequired,
};

Menu.defaultProps = {
  isDrawerOpen: false,
};

export default withStyles(classes)(Menu);
