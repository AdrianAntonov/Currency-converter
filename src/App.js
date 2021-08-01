import React, { useState, useEffect } from 'react';
import data from './data/data';
import Currency from './Currency';
import './App.css';

function App() {
	const list = data.exchangeRates.map((item) => item);

	const listCode = data.exchangeRates.map((item) => item.code);

	const findRate = (obj, item) => {
		let el = obj.filter((el) => el.code === item);
		return 1 / el[0].rate;
	};

	const [ currencyList, setCurrencyList ] = useState([]);
	const [ fromCurrency, setFromCurrency ] = useState();
	const [ toCurrency, setToCurrency ] = useState();
	const [ base, setBase ] = useState('USD');
	const [ destination, setDestination ] = useState('EUR');
	const [ exchangeRate, setExchangeRate ] = useState();
	const [ amount, setAmount ] = useState(1);
	const [ amountInFromCurrency, setAmountInFromCurrency ] = useState(true);

	let toAmount, fromAmount;
	if (amountInFromCurrency) {
		fromAmount = amount;
		if (base !== 'USD') {
			toAmount = amount * (findRate(list, destination) / exchangeRate);
		} else {
			toAmount = amount * exchangeRate;
		}
	} else {
		toAmount = amount;
		if (base !== 'USD') {
			fromAmount = amount / (findRate(list, base) / exchangeRate);
		} else {
			fromAmount = amount / exchangeRate;
		}
	}
	useEffect(() => {
		const defaultCurrency = base;
		const firstCurrency = destination;
		setCurrencyList(listCode);
		setFromCurrency(defaultCurrency);
		setToCurrency(firstCurrency);
		setExchangeRate(findRate(list, firstCurrency));
	}, []);

	useEffect(
		() => {
			if (fromCurrency != null && toCurrency != null) {
				if (base !== 'USD') {
					let count = findRate(list, base);
					setExchangeRate(count);
				} else {
					setExchangeRate(findRate(list, destination));
				}
			}
		},
		[ fromCurrency, toCurrency ]
	);

	const changeFromAmount = (e) => {
		if (/\D^\s/.test(e.target.value) || e.target.value < 0) {
			alert('Input is not a number!');
			return false;
		}
		if (e.target.value.length > 6) {
			return false;
		}

		setAmount(e.target.value);
		setAmountInFromCurrency(true);
	};

	const changeToAmount = (e) => {
		setAmount(e.target.value);
		setAmountInFromCurrency(false);
	};

	return (
		<div>
			<h1>Currency Converter</h1>
			<Currency
				currencyList={currencyList}
				firstListedCurrency={fromCurrency}
				selectCurrency={(e) => {
					return setBase(e.target.value), setFromCurrency(e.target.value);
				}}
				amount={fromAmount}
				setAmount={changeFromAmount}
			/>
			<div className="equals">=</div>
			<Currency
				currencyList={currencyList}
				firstListedCurrency={toCurrency}
				selectCurrency={(e) => {
					return setToCurrency(e.target.value), setDestination(e.target.value);
				}}
				amount={toAmount.toFixed(2)}
				setAmount={changeToAmount}
			/>
		</div>
	);
}

export default App;
