import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { Summary } from './Summary.js';

function setup() {
  const props = {
    isPlaying: false,
    transactionLog: [],
    netWorth: 1234.4501,
    holdNetWorth: 54321.6403,
  };

  const enzymeWrapper = shallow(<Summary {...props} />);

  return {
    props,
    enzymeWrapper,
  };
}

describe('Summary', () => {
  it('Summary renders h3 tag', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('h3').length).toEqual(1);
  });
  it('Summary renders net worth', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.find('.net-worth-trades').text()).toEqual('1,234.45');
    expect(enzymeWrapper.find('.net-worth-hold').text()).toEqual('54,321.64');
  });
});
