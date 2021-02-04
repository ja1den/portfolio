import React from 'react';
import ReactDOM from 'react-dom';

import './styles/global.scss';

import Terminal from './components/Terminal';

const App: React.FC = () => {
	return <Terminal />;
}

ReactDOM.render(<App />, document.getElementById('root'));
