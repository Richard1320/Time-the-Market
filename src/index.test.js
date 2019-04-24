import React from 'react';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { mount } from 'enzyme';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

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

export function generateMockData(limit) {
  if (!limit) limit = 1000;

  let data = [];
  for (let i = 1; i <= limit; i++) {
    data.push({
      'Consumer Price Index': i,
      Date: '1871-01-01',
      Dividend: 0.26,
      Earnings: 0.4,
      'Long Interest Rate': 5.32,
      PE10: null,
      'Real Dividend': 5.21,
      'Real Earnings': 8.02,
      'Real Price': 89.0,
      SP500: 4.44,
    });
  }
  return data;
}

describe('integration testing', () => {
  const mock = new MockAdapter(axios);
  const data = generateMockData();
  mock.onGet('/data/historical-sp500.json').reply(200, data);
  const wrapper = mount(
    <Provider store={store}>
      <App />
    </Provider>
  );
  beforeAll(() => {
    process.env.NODE_ENV = 'production';
  });
  // beforeEach(() => {
  // });
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
  it('should load data from json file', async () => {
    expect(store.getState().historicalData.length).toEqual(1000);
  });
  it('should start the game and stop the game after 120 iterations', async () => {
    // await flushAllPromises();
    const button = wrapper.find('.btn--start');
    jest.useFakeTimers();
    button.simulate('click');
    // Fast-forward until all timers have been executed
    jest.runAllTimers();
    expect(store.getState().runningData.length).toEqual(120);
  });
});
