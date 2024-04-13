import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import reportWebVitals from './reportWebVitals';
import {store,persistor} from './store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import App from './App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const root = ReactDOM.createRoot(document.getElementById('root')!)

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        }
    }
})

root.render(
  <Provider store={store}>

  <QueryClientProvider client={queryClient}>
        <React.StrictMode>
            <App />
        </React.StrictMode>,
  </QueryClientProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
