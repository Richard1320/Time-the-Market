import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import Footer from './Footer.js';

describe('Summary', () => {
  const footer = shallow(<Footer />);
  it('Footer renders anchor tag', () => {
    expect(footer.find('a').length).toEqual(2);
  });
});
