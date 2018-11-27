import React from 'react';
import PropTypes from 'prop-types';
import { Paper, withStyles } from '@material-ui/core';
// import Typography from '@material-ui/core/Typography';

const styles = (theme) => {
  return {
    // appBarSpacer: theme.mixins.toolbar,
    main: {
      margin: theme.spacing.unit * 4,
      display: 'flex',
      justifyContent: 'center',
      width: 'auto',
    },
    fullwidth: {
      width: '100vw',
      height: '83vh',
    },
  };
};

class Dashboard extends React.Component {
  render() {
    const { classes, children } = this.props;
    return (
      <div className={classes.main}>
        <Paper className={classes.fullwidth}>
          {children}
        </Paper>
      </div>
    );
  }
}

Dashboard.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
