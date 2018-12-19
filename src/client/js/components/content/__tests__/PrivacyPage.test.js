import React from 'react';
import enzyme from 'enzyme';
import ContactPage from '../ContactPage';

describe('ContactPage', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = enzyme.shallow(<ContactPage />);
  });
  it('Should render the content without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
