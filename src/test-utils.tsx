import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

export const renderPage = (ui: React.ReactElement) =>
	render(
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<BrowserRouter>{ui}</BrowserRouter>
			</PersistGate>
		</Provider>,
	);
