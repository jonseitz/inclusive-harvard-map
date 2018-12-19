import React from 'react';
import enzyme from 'enzyme';
import Dashboard from '../Dashboard';

describe('Dashboard', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = {
      children: () => (<div />),
      classes: {
        appSpacer: 'appSpacer',
        main: 'main',
        fullWidth: 'fullWidth',
      },
    };
    wrapper = enzyme.shallow(<Dashboard.Naked {...props} />);
  });
  it('Should render the content without errors', () => {
    // expect(wrapper).toMatchSnapshot();
  });
});
