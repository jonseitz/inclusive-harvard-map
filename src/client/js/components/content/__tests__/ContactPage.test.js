import React from 'react';
import enzyme from 'enzyme';
import PrivacyPage from '../PrivacyPage';

describe('PrivacyPage', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = enzyme.shallow(<PrivacyPage />);
  });
  it('Should render the content without errors', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
