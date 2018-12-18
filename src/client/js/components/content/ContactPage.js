import React from 'react';
import ReactMarkdown from 'react-markdown';

/**
 * Renders contact for bug reports, along with other useful contact info at Hsrvard.
 * @extends React.Component
 */

const content = `
Please report any issues with missing or inaccurate content in this application to [map-issues@jonathanseitz.com](mailto:map-issues@jonathanseitz.com).

If you feel unsafe on campus, contact the **Harvard University Police Department at [(617) 495-1212](tel:617-495-1212)**. 

For medical issues, you can contact **Harvard University Health Services' 24-hour urgent care line at [(617) 495-5711](tel:617-495-5711)**.

Confidential support and advocacy for survivors of sexual and gender-based violence is available from the **Office of Sexual Assault Prevention & Response's 24-hour hotline at [(617) 495-9100](tel:617-495-9100)**.

**In any and all other emergencies, dial [911](tel:911).**
`;

class ContactPage extends React.Component {
  render() {
    return (
      <ReactMarkdown>
        {content}
      </ReactMarkdown>);
  }
}

export default ContactPage;
