import React from 'react';
import App from './App';
import {Provider} from 'react-redux';
import store from './redux/store';
import {act, fireEvent, render, screen} from '@testing-library/react';
import {vi} from 'vitest';

import {FETCH_DATA_FULFILLED, RESET_STORE} from './redux/actionTypes';
import {FETCH_ERROR_MESSAGE} from './redux/actions';
import {IDataPoint} from "./redux/initialState";

export function generateMockData(limit?: number) {
    if (!limit) limit = 1000;

    const data = [];
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
        } as IDataPoint);
    }
    return data;
}

describe('integration testing', () => {
    const data = JSON.stringify(generateMockData());

    beforeEach(() => {
        // A Response body can only be read once, so build one per request
        vi.stubGlobal('fetch', vi.fn(async () => new Response(data)));
    });

    afterEach(() => {
        vi.unstubAllGlobals();
        vi.useRealTimers();
        act(() => {
            store.dispatch({type: RESET_STORE});
        });
    });

    async function renderApp() {
        const view = render(
            <Provider store={store}>
                <App/>
            </Provider>
        );
        // Let the fetch dispatched on mount finish
        await act(async () => {
            await vi.waitFor(() => {
                expect(store.getState().historicalData.length).toBeGreaterThan(0);
            });
        });
        return view;
    }

    it('should show no error and enable start once data has loaded', async () => {
        const {container} = await renderApp();
        expect(screen.queryByRole('alert')).toBeNull();
        expect(container.querySelector<HTMLButtonElement>('.btn--start')!.disabled).toEqual(false);
    });
    it('should show an error and disable start when data fails to load', async () => {
        vi.spyOn(console, 'error').mockImplementationOnce(() => {});
        vi.stubGlobal('fetch', vi.fn(async () => new Response('', {status: 500})));
        // historicalData survives RESET_STORE, so clear what earlier tests loaded
        store.dispatch({type: FETCH_DATA_FULFILLED, payload: []});

        const {container} = render(
            <Provider store={store}>
                <App/>
            </Provider>
        );

        expect((await screen.findByRole('alert')).textContent).toEqual(FETCH_ERROR_MESSAGE);
        expect(container.querySelector<HTMLButtonElement>('.btn--start')!.disabled).toEqual(true);
    });
    it('should render a h1', async () => {
        const {container} = await renderApp();
        expect(container.querySelector('h1')).not.toBeNull();
    });
    it('should change time period on input change', async () => {
        const {container} = await renderApp();
        const input = container.querySelector('#input-time-period')!;
        fireEvent.change(input, {target: {value: '320'}});
        expect(store.getState().timePeriod).toEqual(320);
    });
    it('should load data from json file', async () => {
        await renderApp();
        expect(store.getState().historicalData.length).toEqual(1000);
    });
    it('should start the game and stop the game after 120 iterations', async () => {
        const {container} = await renderApp();
        vi.useFakeTimers();
        fireEvent.click(container.querySelector('.btn--start')!);
        // Fast-forward until all timers have been executed
        act(() => {
            vi.runAllTimers();
        });
        expect(store.getState().runningData.length).toEqual(120);
    });
});
