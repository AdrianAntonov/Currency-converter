import React from 'react';

const Currency = ({ currencyList, firstListedCurrency, selectCurrency, amount, setAmount }) => {
	// console.log(currencyList);
	return (
		<div>
			<input className="input" type="number" maxLength="6" value={`${amount}`} onChange={setAmount} />
			<select value={firstListedCurrency} onChange={selectCurrency}>
				{currencyList.map((item) => (
					<option key={item} value={item}>
						{item}
					</option>
				))}
			</select>
		</div>
	);
};

export default Currency;
