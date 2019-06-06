const initialState = {
  historicalData: [], // All data retrieved from API
  startIndex: 0, // App running start point in historical data
  counter: 0, // Number of times app has ticked
  timePeriod: 120, // Maximum number of ticks
  runningData: [], // All ticked data
  netWorth: 10000, // Net worth from buy / sell
  holdNetWorth: 10000, // Net worth if invested start to finish
  transactionLog: [], // Buy / sell transactions
  startInvested: false,
  runningTimeout: false, // SetTimeout ID for app tick
  isPlaying: false, // Check if app is running
  gameSpeed: 1, // Speed between each tick
};
export default initialState;

export interface stateTypes {
  historicalData: Array<any>;
  startIndex: number;
  counter: number;
  timePeriod: number;
  runningData: Array<any>;
  netWorth: number;
  holdNetWorth: number;
  transactionLog: Array<string>;
  startInvested: boolean;
  runningTimeout: boolean;
  isPlaying: boolean;
  gameSpeed: number;
}
