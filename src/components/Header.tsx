import React from 'react';

const Header: React.FC = () => {
	return (
		<div className="component--header">
			<div className="container">
				<div className="row">
					<div className="col-12 text-center">
						<h1>Time the Market</h1>
						<p>
							Time in the market beats timing the market. Many have tried.
							Most have failed.
						</p>
						<p>
							Will you be the lucky one? Now you can attempt to time the
							S&amp;P500 and see if you can predict the highs and the lows.
							Real historical S&amp;P500 pricing data is used, the dates are
							randomized, and the only information provided while playing is
							the chart pattern.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
