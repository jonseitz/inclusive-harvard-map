import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import {
  Button,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  Typography,
  withStyles,
} from '@material-ui/core';
import { getFacilityType } from '../../api';

const styles = (theme) => ({
  scrollableTable: {
    overflowY: 'scroll',
    overflowX: 'hidden',
    maxHeight: '90%',
    position: 'relative',
  },
});

const lactationInfo = `
**Note:** For information about accessing lactation rooms, see [Harvard's HR website](https://hr.harvard.edu/parental-lactation-support).
`;

/**
 * Displays a list of all buildings in map, with links to interior
 * @extends React.Component
 */

class LactationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lactationRooms: [],
    };
  }

  componentDidMount() {
    const { setAppMessage } = this.props;
    getFacilityType('lactation').then((lactationRooms) => {
      this.setState({ lactationRooms });
    }).catch((err) => {
      setAppMessage(err.message);
    });
  }

  render() {
    const {
      classes,
      floorplanHandler,
    } = this.props;
    const { lactationRooms } = this.state;
    return (
      <React.Fragment>
        <Typography variant="subtitle2">
          <ReactMarkdown>{lactationInfo}</ReactMarkdown>
        </Typography>
        <div className={classes.scrollableTable}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Building</TableCell>
                <TableCell>Floor</TableCell>
                <TableCell>Map</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lactationRooms.map((room) => (
                <TableRow key={room.id}>
                  <TableCell>{room.building.buildingName}</TableCell>
                  <TableCell>{room.floorplan.floorNumber}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => {
                        floorplanHandler(
                          room.building.id,
                          room.floorplan.floorNumber
                        );
                      }}
                    >
              View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </React.Fragment>
    );
  }
}

LactationList.propTypes = {
  classes: PropTypes.object.isRequired,
  floorplanHandler: PropTypes.func.isRequired,
  setAppMessage: PropTypes.func.isRequired,
};

export default withStyles(styles)(LactationList);
