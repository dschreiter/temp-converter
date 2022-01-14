//Dev notes:
// the first method used was form submit & useRef()
// this example will use useState directly following input changes
// the convert btn could have been omited and just calc on input
// which would ave the user a step ...

import { useState } from 'react';

function ConvertTempV2(props) {
	//UI Helpers
	const farenheitLabel = '°F';
	const celsiusLabel = '°C';
	const [inputPlaceholder, setInputPlaceholder] = useState(
		`Convert from ${farenheitLabel} to ${celsiusLabel}`
	);

	const [enteredTemp, setEnteredTemp] = useState('');
	const [radio, setRadio] = useState(farenheitLabel); // default farenheit
	const [calculatedNum, setCalculatedNum] = useState();
	const [displayConversion, setDisplayConversion] = useState(false);

	const tempInputHandler = (event) => {
		setEnteredTemp(event.target.value);
	};

	// const radioHandler = () => {

	// };

	const convertHandler = () => {
		if (enteredTemp.length > 0 && radio === farenheitLabel) {
			// convert from farenheit to celsius
			const calcToC = (((enteredTemp - 32) * 5) / 9).toFixed(2);
			setCalculatedNum(calcToC);
			setDisplayConversion(true);
		} else if (enteredTemp.length > 0 && radio === celsiusLabel) {
			// convert from celsius to farenheit
			const calcToF = ((enteredTemp * 9) / 5 + 32).toFixed(2);
			setCalculatedNum(calcToF);
			setDisplayConversion(true);
		}
	};

	return (
		<>
			<h3>Temperature Converter: Version 2 via useState</h3>
			<input
				type='number'
				placeholder={inputPlaceholder}
				onChange={tempInputHandler}
				onClick={() => {
					setEnteredTemp(''); // clear on focus, in order to accept new values
					setDisplayConversion(false);
					setCalculatedNum('');
				}}
				value={enteredTemp}
			/>
			<label htmlFor='farenheit'>
				<input
					defaultChecked
					id='farenheit'
					name='tempType'
					type='radio'
					onClick={() => {
						setRadio(farenheitLabel);
						setDisplayConversion(false);
						setInputPlaceholder(
							`Convert from ${farenheitLabel} to ${celsiusLabel}`
						);
					}}
				/>
				{farenheitLabel}
			</label>

			<label htmlFor='celsius'>
				<input
					id='celsius'
					name='tempType'
					type='radio'
					onClick={() => {
						setRadio(celsiusLabel);
						setDisplayConversion(false);
						setInputPlaceholder(
							`Convert from ${celsiusLabel} to ${farenheitLabel}`
						);
					}}
				/>
				{celsiusLabel}
			</label>
			<div>
				<button onClick={convertHandler}>Convert</button>
			</div>

			{displayConversion ? (
				<p>
					<strong>
						<i>
							{enteredTemp} {radio}
						</i>
					</strong>
					{' converts to '}
					<strong>
						<i>{calculatedNum}</i>
						{radio === farenheitLabel
							? celsiusLabel
							: farenheitLabel}
					</strong>
				</p>
			) : null}
		</>
	);
}

export default ConvertTempV2;
