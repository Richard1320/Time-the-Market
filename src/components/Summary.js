import React, { Component } from 'react';
import { connect } from 'react-redux';

class Summary extends Component {
  renderTransactions() {
    let rows = [];
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
    return rows;
  }
  render() {
    return (
      <div className="component--summary">
        <h3>Summary</h3>
        <p>Value: ${this.props.netWorth.toFixed(2).toLocaleString()}</p>
        <div className="transaction-log">
          {!this.props.isPlaying ? this.renderTransactions() : ''}
        </div>
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
  };
};

export default connect(
  mapStateToProps,
  null
)(Summary);
