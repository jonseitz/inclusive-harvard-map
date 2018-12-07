import React from 'react';
import PropTypes from 'prop-types';
import { Paper, withStyles } from '@material-ui/core';

const styles = (theme) => {
  return {
    main: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'stretch',
      width: 'auto',
      [theme.breakpoints.up('md')]: {
        margin: theme.spacing.unit * 4,
        marginLeft: theme.spacing.unit * 4 + theme.drawer.width,
      },
    },
    fullwidth: {
      width: '100vw',
      height: '100vh',
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        height: `calc(100vh - ${theme.spacing.unit * 9 + theme.mixins.toolbar.minHeight}px)`,
      },
    },
    appSpacer: {
      ...theme.mixins.toolbar,
    },
  };
};

class Dashboard extends React.Component {
  render() {
    const { classes, children } = this.props;
    return (
      <React.Fragment>
        <div className={classes.appSpacer} />
        <div className={classes.main}>
          <Paper className={classes.fullwidth}>
            {children}
          </Paper>
        </div>
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
