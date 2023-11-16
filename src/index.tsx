import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Store } from './app/store';
import { ToggleAsideContext } from './components/Context/ToggleAsideContext';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
    <Provider store={Store}>
        <BrowserRouter>
            <ToggleAsideContext>
                <App/>
            </ToggleAsideContext>
        </BrowserRouter>
    </Provider>
);
