import React from 'react';
import {render} from 'react-dom';
import App from './Payment.js';
import configure from './sentry'

configure()
render(<App/>, document.querySelector('#app'));
