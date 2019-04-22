import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { mount } from 'enzyme';

import { RESET_STORE } from './redux/actionTypes';

/* Async function that will finish execution after all promises have been finished
 * Usage:
 *   it('...', async () =. {
 *     // mount component
 *     // execute actions
 *     await flushAllPromises();
 *     // execute assertions for async actions
 *   });
 */
// export function flushAllPromises() {
//   return new Promise(resolve => setImmediate(resolve));
// }

describe('integration testing', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
  afterEach(() => {
    store.dispatch({ type: RESET_STORE });
  });

  it('should render a h1', () => {
    // expect(wrapper.find('div.dog-placeholder').text()).toEqual('No dog loaded yet. Get some!');
    expect(wrapper.find('h1')).toBeDefined();
  });
  it('should change time period on input change', () => {
    const input = wrapper.find('#input-time-period');
    input.simulate('change', { target: { value: '320' } });
    expect(store.getState().timePeriod).toEqual(320);
  });
  it('should start the game and stop the game after 120 iterations', async () => {
    // await flushAllPromises();
    const button = wrapper.find('.btn--start');
    jest.useFakeTimers();
    button.simulate('click');
    // Fast-forward until all timers have been executed
    jest.runAllTimers();
    expect(store.getState().timePeriod).toEqual(120);
  });
});
