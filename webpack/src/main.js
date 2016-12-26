import React from 'react';
import {render} from 'react-dom';
import Order from './Order.js';
import orderStore from './OrderStore'

render(<Order store={orderStore} />, document.querySelector('#app'));
