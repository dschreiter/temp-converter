// Dev notes:  Nice meeting with yout today, if you were curious how I would solve todays question:
// of course alot different way to build, this uses a form submit & useRef
// could have been done just as well with useState() (see V2 for that) on the inputs change perhaps more straightfoward, really a question of controlled vs uncontrolled components
// this seemed sufficeint for this use case

import { useState, useRef } from 'react';

function ConvertTempV1() {
	//Form data & calc
	const enteredValue = useRef('');
	const farenehitRadio = useRef(true);
	const celsiusRadio = useRef(false);
	const [formData, setFormData] = useState({});
	const [convertedNum, setConvertedNum] = useState();

	//UI Helpers
	const farenheitLabel = '°F';
	const celsiusLabel = '°C';
	const [inputPlaceholder, setInputPlaceholder] = useState(
		`Convert from ${farenheitLabel} to ${celsiusLabel}`
	);

	const formSubmitHandler = (event) => {
		event.preventDefault();

		const currentFormData = {
			farenheitChecked: farenehitRadio.current.checked,
			celsiusChecked: celsiusRadio.current.checked,
			enteredValue: enteredValue.current.value,
		};

		setFormData(currentFormData);
		convertNumbers();
	};

	const convertNumbers = () => {
		if (farenehitRadio.current.checked === true) {
			// Calc from Farenheit to Celsius
			const calcToC = (
				((enteredValue.current.value - 32) * 5) /
				9
			).toFixed(2);

			setConvertedNum(calcToC);
		} else if (celsiusRadio.current.checked === true) {
			// Calc from Celsius to Farenheit
			const calcToF = ((enteredValue.current.value * 9) / 5 + 32).toFixed(
				2
			);
			setConvertedNum(calcToF);
		}
	};

	const presentConversion = () => {
		// could have been embed in the JSX as well, this seemed a bit cleaner
		// most of this stuff would be broken into seperate components in a real world situation

		return (
			<p>
				<strong>
					<i>
						{formData.enteredValue}
						{formData.farenheitChecked === true
							? farenheitLabel
							: celsiusLabel}
					</i>
				</strong>
				{' converts to '}
				<strong>
					<i>
						{convertedNum}
						{formData.farenheitChecked === true
							? celsiusLabel // target of new Conversion
							: farenheitLabel}
					</i>
				</strong>
			</p>
		);
	};

	return (
		<>
			<h3>Temperature Converter: Version 1 via formSubmit & useRef</h3>

			<form onSubmit={formSubmitHandler}>
				{/* input */}

				<input
					type='number'
					name='numToConvert'
					ref={enteredValue}
					onClick={() => {
						enteredValue.current.value = ''; // usually would update via useState not directly, in this case with ref done alittle differently
						setConvertedNum('');
					}}
					placeholder={inputPlaceholder}
				/>

				{/* radio for F */}
				<label htmlFor='farenheit'>
					<input
						id='farenheit'
						defaultChecked
						type='radio'
						name='conversionType'
						ref={farenehitRadio}
						onClick={() => {
							setInputPlaceholder(
								`Convert From ${farenheitLabel} to ${celsiusLabel}`
							);
						}}
					/>
					{farenheitLabel}
				</label>

				{/* radio for C */}
				<label htmlFor='celsius'>
					<input
						id='celsius'
						type='radio'
						name='conversionType'
						ref={celsiusRadio}
						onClick={() => {
							setInputPlaceholder(
								`Convert From ${celsiusLabel} to ${farenheitLabel}`
							);
						}}
					/>
					{celsiusLabel}
				</label>

				{/* button */}
				<div>
					<button type='submit'>Convert</button>
				</div>
			</form>

			{/* conversion results */}
			{convertedNum ? presentConversion() : null}
		</>
	);
}

export default ConvertTempV1;
