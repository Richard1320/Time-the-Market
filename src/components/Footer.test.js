import React from 'react';
import {shallow} from 'enzyme';
import Footer from './Footer';

describe('Summary', () => {
	const footerWrapper = shallow(<Footer/>);
	it('Footer renders anchor tag', () => {
		expect(footerWrapper.find('a').length).toEqual(2);
	});
});
