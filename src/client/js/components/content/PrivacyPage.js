import React from 'react';
import ReactMarkdown from 'react-markdown';

/**
 * Renders a message about privacy while using the app, including an explanation about location data.
 * @extends React.Component
 */

const content = `
This application does not store any personal identifying information about its users, and wherever possible limits the sharing of that information with groups or corporations that may do so.

By default, location data from your device is not used. If you choose to use your location data, your coordinates may be stored in server logs along with the public IP address of the device making the request. It will not be shared with any outside vendors or services.

**The privacy of your data matters. You should haven't to trade that privacy away just to find a restroom.**
`;

class PrivacyPage extends React.Component {
  render() {
    return (
      <ReactMarkdown>
        {content}
      </ReactMarkdown>);
  }
}

export default PrivacyPage;
