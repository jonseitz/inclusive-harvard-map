import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Snackbar, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

const styles = (theme) => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

/**
 * Displays a "snackbar" notification at the bottom of the page with a message queue to resolve conflicting messages
 * @extends React.Component
 * @param  {Object}  props
 * @param  {String}  props.message  the message to display
 * @param  {Object}  props.classes  JSS styles from withStyles
 */

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.queue = [];
    this.state = {
      isOpen: false,
      messageInfo: {},
    };
    this.closeHandler = this.closeHandler.bind(this);
    this.exitHandler = this.exitHandler.bind(this);
    this.processQueue = this.processQueue.bind(this);
  }

  /**
   * pushes the message onto the internal queuing for the notification.
   * @method componentDidMount
   */

  componentDidMount() {
    const { message } = this.props;
    const { isOpen } = this.state;
    this.queue.push({
      message,
      key: new Date().getTime(),
    });

    if (!isOpen) {
      this.processQueue();
    }
  }

  /**
   * pushes new messages onto the queue, closes prior messages and processes new ones
   * @method  componentDidUpdate
   * @param  {object}  prevProps  the props passed in to previous render
   */
  componentDidUpdate(prevProps) {
    const { isOpen } = this.state;
    const { message } = this.props;
    const { message: lastMessage } = prevProps;
    if (message !== lastMessage) {
      this.queue.push({
        message,
        key: new Date().getTime(),
      });
      if (isOpen) {
        // eslint-disable-next-line
        this.setState({ isOpen: false });
      } else {
        this.processQueue();
      }
    }
  }

  /**
   * Event handler for the close button
   * @method closeHandler
   * @param  {Object}  event  DOM event
   * @param  {String}  reason  How the handler was invoked
   */
  closeHandler(event, reason) {
    this.setState({ isOpen: false });
  }

  /**
   *  Show any additional messages after closing this one.
   *  @method  exitHandler
   */

  exitHandler() {
    this.processQueue();
  }

  /**
   * If there are messages in the queue, display them.
   * @method processQueue
   */

  processQueue() {
    if (this.queue.length > 0) {
      this.setState({
        messageInfo: this.queue.shift(),
        isOpen: true,
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { isOpen, messageInfo } = this.state;
    return (
      <Snackbar
        key={messageInfo.key}
        open={isOpen}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        autoHideDuration={4000}
        ContentProps={{
          'aria-describedby': 'notification-message',
        }}
        onClose={this.closeHandler}
        onExited={this.exitHandler}
        message={<span id="notification-message">{messageInfo.message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            className={classes.close}
            onClick={this.closeHandler}
          >
            <Close />
          </IconButton>,
        ]}
      />);
  }
}

Notification.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string,
};

Notification.defaultProps = {
  message: '',
};

export default withStyles(styles)(Notification);
