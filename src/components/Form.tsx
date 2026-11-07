import React from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {stateTypes} from '../redux/initialState';
import {
    buySellHandler,
    gameSpeedHandler,
    startGameHandler,
    startInvestedHandler,
    stopGameHandler,
    timePeriodHandler,
} from '../redux/actions';

import {AppDispatch} from '../redux/store';
import {isHolding} from '../Helpers';

const Form: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const hasData = useSelector((state: stateTypes) => state.historicalData.length > 0);
    const fetchError = useSelector((state: stateTypes) => state.fetchError);
    const isPlaying = useSelector((state: stateTypes) => state.isPlaying);
    const startIndex = useSelector((state: stateTypes) => state.startIndex);
    const gameSpeed = useSelector((state: stateTypes) => state.gameSpeed);
    const timePeriod = useSelector((state: stateTypes) => state.timePeriod);
    const transactionLog = useSelector((state: stateTypes) => state.transactionLog);

    return (
        <div className="component--form">
            <div className="container">
                {fetchError && (
                    <div className="alert theme-danger mb-3" role="alert">
                        {fetchError}
                    </div>
                )}
                <div className="row">
                    <div className="col-12 md:col-3 p-3">
                        <label htmlFor="input-game-speed">Game Speed</label>
                        <select
                            id="input-game-speed"
                            value={gameSpeed}
                            disabled={isPlaying}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                dispatch(gameSpeedHandler(Number(e.target.value)))
                            }}
                        >
                            <option value="0.25">0.25x</option>
                            <option value="0.5">0.5x</option>
                            <option value="1">1x</option>
                            <option value="2">2x</option>
                        </select>
                    </div>
                    <div className="col-12 md:col-3 p-3">
                        <label htmlFor="input-time-period">Time Period</label>
                        <select
                            id="input-time-period"
                            value={timePeriod}
                            disabled={isPlaying}
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                dispatch(timePeriodHandler(parseInt(e.target.value)))
                            }}
                        >
                            <option value="120">10 Years</option>
                            <option value="240">20 Years</option>
                            <option value="320">30 Years</option>
                            <option value="480">40 Years</option>
                        </select>
                    </div>
                    <div className="col-12 md:col-3 p-3">
                        <label htmlFor="input-start-invested">Start Invested</label>
                        <input
                            id="input-start-invested"
                            type="checkbox"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                dispatch(startInvestedHandler(e.target.checked))
                            }}
                        />
                    </div>
                    <div className="col-12 md:col-3 p-3">
                        <button
                            type="button"
                            className="btn--start"
                            disabled={!hasData}
                            onClick={() => {
                                dispatch(startGameHandler())
                            }}
                        >
                            {startIndex ? 'Restart' : 'Start'}
                        </button>
                        <button
                            type="button"
                            className="btn--stop"
                            disabled={!isPlaying}
                            onClick={() => {
                                dispatch(stopGameHandler())
                            }}
                        >
                            Stop
                        </button>
                        <button
                            type="button"
                            className="btn--transaction"
                            disabled={!isPlaying}
                            onClick={() => {
                                dispatch(buySellHandler())
                            }}
                        >
                            {isHolding(transactionLog) ? 'Sell' : 'Buy'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form;