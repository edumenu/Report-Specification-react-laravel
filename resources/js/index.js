import React from 'react';
import ReactDOM from 'react-dom';
import App from './src/App';
import RootStore from "./src/store/RootStore";
import { Provider } from "mobx-react";


ReactDOM.render(
    <Provider
        RootStore={RootStore}>
        <App />
    </Provider>
    , document.getElementById('App'));
