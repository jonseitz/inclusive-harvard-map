import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Snackbar, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

const styles = (theme) => {
  return {
    close: {
      padding: theme.spacing.unit / 2,
    },
  };
};

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

  closeHandler(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ isOpen: false });
  }

  exitHandler() {
    this.processQueue();
  }

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
