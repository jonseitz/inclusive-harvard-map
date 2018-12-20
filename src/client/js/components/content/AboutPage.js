import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Typography } from '@material-ui/core';

/**
 * Renders a simple description of the app
 * @extends React.Component
 */

const content = `
Our goal is to help everyone feel welcome on Harvard's campus by providing a discreet and efficient way to find gender-neutral restrooms and lactation rooms on campus.

This app was build by Jonathan Seitz, Application Developer in the Computing Department at the Harvard John A. Paulson School of Engineering and Applied Sciences, as a Capstone Project for the Design Media Design program at the Harvard Extension School. It is currently a pilot, so some data may be inaccurate or incomplete.

Building floorplans were provided by the Harvard Planning Office. 

Mapping data is provided by OpenStreetMaps.
`;

class AboutPage extends React.Component {
  render() {
    return (
      <Typography variant="body2">
        <ReactMarkdown>
          {content}
        </ReactMarkdown>
      </Typography>);
  }
}

export default AboutPage;
