import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  Typography,
  withStyles,
  IconButton,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

const styles = (theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    width: '90%',
    margin: `${theme.spacing.unit * 2}px auto`,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    [theme.breakpoints.up('md')]: {
      width: '60%',
      margin: `${theme.spacing.unit * 12}px auto`,
    },
  },
  topLine: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
});

/**
 * Renders a modal window for displaying static pages.
 * @extends React.Component
 * @param  {Object[]}  props.children  Any sub-components to display within the menu
 * @param  {Object}  props.classes  JSS styles from withStyles
 * @param  {Function}  props.closeDrawer  handler for closing the overlay 
 * @param  {Boolean}  props.isOpen  Whether the overal should be open
 * @param  {String}  props.title  Text to display at the top of the overlay
 */

class OverlayContent extends React.Component {
  render() {
    const {
      children,
      classes,
      closeHandler,
      isOpen,
      title,
    } = this.props;

    const container = document.querySelector('body');

    return (
      <Modal
        container={container}
        open={isOpen}
        onClose={closeHandler}
      >
        <div className={classes.paper}>
          <div className={classes.topLine}>
            <Typography variant="h5">{title}</Typography>
            <IconButton
              variant="outlined"
              color="primary"
              size="small"
              onClick={closeHandler}
            >
              <Close />
            </IconButton>
          </div>
          <Typography variant="body2">{children}</Typography>
        </div>
      </Modal>
    );
  }
}

OverlayContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  classes: PropTypes.object.isRequired,
  closeHandler: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  title: PropTypes.string,
};

OverlayContent.defaultProps = {
  children: null,
  isOpen: false,
  title: null,
};

export default withStyles(styles)(OverlayContent);
