import React, {useMemo} from 'react';
import {useSelector} from "react-redux";
import {stateTypes} from "../redux/initialState";

const Summary: React.FC = () => {
	const isPlaying = useSelector((state: stateTypes) => state.isPlaying);
	const transactionLog = useSelector((state: stateTypes) => state.transactionLog);
	const netWorth = useSelector((state: stateTypes) => state.netWorth);
	const holdNetWorth = useSelector((state: stateTypes) => state.holdNetWorth);

	const transactions = useMemo(() => {
		const rows = [];
		if (transactionLog.length) {
			rows.push(<h4 key="transaction-title">Transactions</h4>);
			transactionLog.forEach((element: string, index: number) => {
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
					<div key={`transaction-${index}`} className="transaction-item">
						{event}: {element}
					</div>
				);
			});
		}
		return rows;
	},[transactionLog]);

	function localeString(number: number): string {
		return number.toLocaleString(undefined, {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
	}

	return (
		<div className="component--summary">
			<h3>Summary</h3>
			<p>
				Your net worth: $
				<span className="net-worth-trades">
					{localeString(netWorth)}
				</span>
			</p>
			<p>
				Net worth if invested for the entire duration: $
				<span className="net-worth-hold">
					{localeString(holdNetWorth)}
				</span>
			</p>
			<div className="transaction-log mb-3">
				{!isPlaying ? transactions : ''}
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
};

export default Summary;