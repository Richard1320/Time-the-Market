import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  startGameHandler,
  stopGameHandler,
  buySellHandler,
  gameSpeedHandler,
  timePeriodHandler,
  startInvestedHandler,
} from '../redux/actions';

import { isHolding } from '../Helpers';

class Form extends Component {
  gameSpeedHandler(e) {
    let value = e.target.value;
    this.props.gameSpeedHandler(value);
  }
  timePeriodHandler(e) {
    let value = e.target.value;
    this.props.timePeriodHandler(value);
  }
  startInvestedHandler(e) {
    let value = e.target.checked;
    this.props.startInvestedHandler(value);
  }
  startGameHandler() {
    this.props.startGameHandler();
  }
  stopGameHandler() {
    this.props.stopGameHandler();
  }
  buySellHandler() {
    this.props.buySellHandler();
  }
  render() {
    return (
      <div className="component--form">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-3 p-3">
              <label htmlFor="input-game-speed">Game Speed</label>
              <select
                id="input-game-speed"
                value={this.props.gameSpeed}
                disabled={this.props.isPlaying}
                onChange={this.gameSpeedHandler.bind(this)}
              >
                <option value="0.25">0.25x</option>
                <option value="0.5">0.5x</option>
                <option value="1">1x</option>
                <option value="2">2x</option>
              </select>
            </div>
            <div className="col-12 col-md-3 p-3">
              <label htmlFor="input-time-period">Time Period</label>
              <select
                id="input-time-period"
                value={this.props.timePeriod}
                disabled={this.props.isPlaying}
                onChange={this.timePeriodHandler.bind(this)}
              >
                <option value="120">10 Years</option>
                <option value="240">20 Years</option>
                <option value="320">30 Years</option>
                <option value="480">40 Years</option>
              </select>
            </div>
            <div className="col-12 col-md-3 p-3">
              <label htmlFor="input-start-invested">Start Invested</label>
              <input
                id="input-start-invested"
                type="checkbox"
                value={this.props.startInvested}
                onChange={this.startInvestedHandler.bind(this)}
              />
            </div>
            <div className="col-12 col-md-3 p-3">
              <button
                type="button"
                className="btn--start"
                onClick={this.startGameHandler.bind(this)}
              >
                {this.props.startIndex ? 'Restart' : 'Start'}
              </button>
              <button
                type="button"
                className="btn--stop"
                disabled={!this.props.isPlaying}
                onClick={this.stopGameHandler.bind(this)}
              >
                Stop
              </button>
              <button
                type="button"
                className="btn--transaction"
                disabled={!this.props.isPlaying}
                onClick={this.buySellHandler.bind(this)}
              >
                {isHolding(this.props.transactionLog) ? 'Sell' : 'Buy'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  startInvestedHandler,
  gameSpeedHandler,
  timePeriodHandler,
  buySellHandler,
  startGameHandler,
  stopGameHandler,
};
const mapStateToProps = function(state, ownProps) {
  return {
    isPlaying: state.isPlaying,
    startIndex: state.startIndex,
    gameSpeed: state.gameSpeed,
    timePeriod: state.timePeriod,
    startInvested: state.startInvested,
    transactionLog: state.transactionLog,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
