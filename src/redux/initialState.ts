export interface IDataPoint {
	'Consumer Price Index': number;
	Date: string;
	Dividend: number;
	Earnings: number;
	'Long Interest Rate': number;
	PE10: number | null;
	'Real Dividend': number;
	'Real Earnings': number;
	'Real Price': number;
	SP500: number;
}

export interface stateTypes {
	historicalData: IDataPoint[];
	startIndex: number;
	counter: number;
	timePeriod: number;
	runningData: IDataPoint[];
	netWorth: number;
	holdNetWorth: number;
	transactionLog: string[];
	startInvested: boolean;
	runningTimeout: boolean;
	isPlaying: boolean;
	gameSpeed: number;
}

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
} as stateTypes;
export default initialState;

