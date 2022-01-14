import './App.css';
import ConvertTempV1 from './components/ConvertTempV1';
import ConvertTempV2 from './components/ConvertTempV2';

function App() {
	return (
		<div className='App'>
			<p>
				A Basic temp converter built in to different versions for code
				test
			</p>
			<ConvertTempV1 />
			<ConvertTempV2 />
		</div>
	);
}

export default App;
