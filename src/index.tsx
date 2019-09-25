import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'sass/index.scss';

// components
import App from './App';
// store
import configureStore from 'store/configureStore';

const store = configureStore();

ReactDOM.render(  <Provider store={store}>
                    <App />
                  </Provider>, document.getElementById('root'));
