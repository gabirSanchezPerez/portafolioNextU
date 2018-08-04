import React from 'react';
import { render } from 'react-dom';

import { BrowserRouter, Route } from 'react-router-dom';

import App from './App.jsx'

render(
	<BrowserRouter>
	    <App />
	</BrowserRouter>,
	document.getElementById('app')
	);
