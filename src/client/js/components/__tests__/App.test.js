import React from 'react';
import assert from 'assert';
import { shallow } from 'enzyme';
import App from '../App';

describe('Component Rendering', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });
  test('component renders correctly', () => {
    assert.strictEqual(wrapper.exists(), true);
  });
});
