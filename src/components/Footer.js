import React, { Component } from 'react';

class Footer extends Component {
  render() {
    let newDate = new Date();
    let year = newDate.getFullYear();

    return (
      <div className="component--footer small">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center p-3">
              &copy; {year} All Rights Reserved. Programmed by{' '}
              <a
                href="https://www.magicmediamuse.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                Richard Hung
              </a>{' '}
              Data provided by{' '}
              <a
                href="https://datahub.io/core/s-and-p-500/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Datahub
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
// describe('App component', () => {
//   ...

//   it('increments count by 1 when the increment button is clicked', () => {
//     const wrapper = shallow(<App />);
//     const incrementBtn = wrapper.find('button.increment');
//     incrementBtn.simulate('click');
//     const text = wrapper.find('p').text();
//     expect(text).toEqual('Count: 1');
//   });
// });
