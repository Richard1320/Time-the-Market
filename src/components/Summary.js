import React, { Component } from 'react';

class Summary extends Component {
  render() {
    return (
      <div className="component--summary">
        <h3>Summary</h3>
        <p>Value: ${this.props.netWorth.toFixed(2).toLocaleString()}</p>
      </div>
    );
  }
}

export default Summary;
