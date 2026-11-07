import React from 'react';
import {render} from '@testing-library/react';
import Footer from './Footer';

describe('Summary', () => {
	it('Footer renders anchor tag', () => {
		const {container} = render(<Footer/>);
		expect(container.querySelectorAll('a').length).toEqual(2);
	});
});
