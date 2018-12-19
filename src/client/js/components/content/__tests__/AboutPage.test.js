import React from 'react';
import enzyme from 'enzyme';
import AboutPage from '../AboutPage';

describe('AboutPage', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = enzyme.shallow(<AboutPage />);
  });
  it('Should render the content without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
