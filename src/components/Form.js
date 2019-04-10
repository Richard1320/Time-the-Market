import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  startGameHandler,
  buySellHandler,
  timePeriodHandler,
  startInvestedHandler,
} from '../redux/actions';

class Form extends Component {
  timePeriodHandler(e) {
    let value = e.target.value;
    this.props.timePeriodHandler(value);
  }
  startInvestedHandler(e) {
    let value = e.target.checked;
    this.props.startInvestedHandler(value);
  }
  startGameHandler(e) {
    this.props.startGameHandler();
  }
  buySellHandler() {
    this.props.buySellHandler();
  }
  isHolding() {
    // Every buy and sell is an item in the transaction log
    // Odd number of items in log is holding (bought)
    // Even number of items in log is waiting (sold)
    console.log('transactoin log', this.props.transactionLog);
    let transactionLength = this.props.transactionLog.length;
    return transactionLength % 2 === 1;
  }
  render() {
    let buySellText;
    if (this.isHolding) {
      buySellText = 'Sell';
    } else {
      buySellText = 'Buy';
    }
    return (
      <div className="component--form">
        <label htmlFor="input-time-period">Time Period</label>
        <select
          id="input-time-period"
          value={this.props.timePeriod}
          onChange={this.timePeriodHandler.bind(this)}
        >
          <option value="120">10 Years</option>
          <option value="240">20 Years</option>
          <option value="320">30 Years</option>
          <option value="480">40 Years</option>
        </select>

        <label htmlFor="input-start-invested">Start Invested</label>
        <input
          id="input-start-invested"
          type="checkbox"
          value={this.props.startInvested}
          onChange={this.startInvestedHandler.bind(this)}
        />

        <button type="button" onClick={this.startGameHandler.bind(this)}>
          Retry
        </button>

        <button type="button" onClick={this.buySellHandler.bind(this)}>
          Buy / Sell
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = {
  startInvestedHandler,
  timePeriodHandler,
  buySellHandler,
  startGameHandler,
};
const mapStateToProps = function(state, ownProps) {
  return {
    timePeriod: state.timePeriod,
    startInvested: state.startInvested,
    // transactionLog: state.transactionLog,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
