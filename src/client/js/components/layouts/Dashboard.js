import React from 'react';
import PropTypes from 'prop-types';
import { Paper, withStyles } from '@material-ui/core';
import StreetMap from '../map/StreetMap';

// import Typography from '@material-ui/core/Typography';

const styles = (theme) => {
  return {
    appBarSpacer: theme.mixins.toolbar,
    main: {
      margin: theme.spacing.unit * 4,
      display: 'flex',
      justifyContent: 'center',
      width: 'auto',
    },
    fullwidth: {
      width: '100vw',
      // padding: theme.spacing.unit * 10,
      height: '80vh',
    },
  };
};

class Dashboard extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.main}>
        <Paper className={classes.fullwidth}>
          <StreetMap />
        </Paper>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
