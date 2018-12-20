import React from 'react';
import PropTypes from 'prop-types';
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

const typeMap = new Map([
  ['men', "Men's"],
  ['women', "Women's"],
  ['neutral', 'Gender-Neutral'],
]);

const styles = (theme) => ({
  scrollableTable: {
    overflowY: 'scroll',
    overflowX: 'hidden',
    maxHeight: '90%',
    position: 'relative',
  },
});

/**
 * Displays a list of all buildings in map, with links to interior
 * @extends React.Component
 */

class RestroomList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restrooms: [],
    };
  }

  componentDidMount() {
    const { setAppMessage } = this.props;
    getFacilityType('men,women,neutral').then((restrooms) => {
      this.setState({ restrooms });
    }).catch((err) => {
      setAppMessage(err.message);
    });
  }

  render() {
    const {
      classes,
      floorplanHandler,
    } = this.props;
    const { restrooms } = this.state;
    return (
      <div className={classes.scrollableTable}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Building</TableCell>
              <TableCell>Floor</TableCell>
              <TableCell>Map</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restrooms.map((room) => (
              <TableRow key={room.id}>
                <TableCell>
                  {typeMap.get(room.locationType)}
                </TableCell>
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
    );
  }
}

RestroomList.propTypes = {
  classes: PropTypes.object.isRequired,
  floorplanHandler: PropTypes.func.isRequired,
  setAppMessage: PropTypes.func.isRequired,
};

export default withStyles(styles)(RestroomList);
