import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Summary extends Component {
  renderTransactions() {
    let rows = [];
    if (this.props.transactionLog.length) {
      rows.push(<h4>Transactions</h4>);
      this.props.transactionLog.forEach((element, index) => {
        let key = 'transaction-' + index;
        let event = '';
        // Check if buy or sell
        if (index % 2 === 0) {
          // Buy
          // Odd items in array is even in 0 index
          event = 'Purchased';
        } else {
          // Sell
          event = 'Sold';
        }
        rows.push(
          <div key={key} className="transaction-item">
            {event}: {element}
          </div>
        );
      });
    }
    return rows;
  }
  render() {
    return (
      <div className="component--summary">
        <h3>Summary</h3>
        <p>
          Your net worth: $
          <span className="net-worth-trades">
            {this.props.netWorth.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </span>
        </p>
        <p>
          Net worth if invested for the entire duration: $
          <span className="net-worth-hold">
            {this.props.holdNetWorth.toLocaleString(undefined, {
              maximumFractionDigits: 2,
            })}
          </span>
        </p>
        <div className="transaction-log mb-3">
          {!this.props.isPlaying ? this.renderTransactions() : ''}
        </div>
        <h4>Important Assumptions</h4>
        <ul>
          <li>
            This money is in your TFSA or RRSP; no tax will be calculated.
          </li>
          <li>Dividends are calculated monthly.</li>
          <li>Trades are free.</li>
          <li>Inflation is not calculated.</li>
        </ul>
      </div>
    );
  }
}

// const mapDispatchToProps = {
//   fetchData,
// };
const mapStateToProps = function(state, ownProps) {
  return {
    isPlaying: state.isPlaying,
    transactionLog: state.transactionLog,
    netWorth: state.netWorth,
    holdNetWorth: state.holdNetWorth,
  };
};

export default connect(
  mapStateToProps,
  null
)(Summary);
