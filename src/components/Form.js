import React, { Component } from 'react';

class Form extends Component {
  constructor() {
    super();
    this.state = {
      timePeriod: 120,
      startInvested: false,
    };
  }
  timelineHandler(e) {
    let value = e.target.value;
    this.setState({
      timePeriod: value,
    });
  }
  startInvestedHandler(e) {
    let value = e.target.checked;
    this.setState({
      startInvested: value,
    });
  }
  formSubmit(e) {
    this.props.formSubmit(this.state);
    e.preventDefault();
  }
  buySellHandler() {
    this.props.buySellHandler();
  }
  render() {
    let buySellText;
    if (this.props.holding) {
      buySellText = 'Sell';
    } else {
      buySellText = 'Buy';
    }
    return (
      <div className="component--form">
        <form onSubmit={this.formSubmit.bind(this)}>
          <label htmlFor="input-time-period">Time Period</label>
          <select
            id="input-time-period"
            value={this.state.timeline}
            onChange={this.timelineHandler.bind(this)}
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
            value={this.state.startInvested}
            onChange={this.startInvestedHandler.bind(this)}
          />

          <button type="submit">Retry</button>
        </form>

        <button type="button" onClick={this.buySellHandler.bind(this)}>
          {buySellText}
        </button>
      </div>
    );
  }
}

export default Form;
