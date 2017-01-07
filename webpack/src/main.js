import React from 'react';
import {render} from 'react-dom';
import Order from './Order.js';
import orderStore from './OrderStore'
import configure from './sentry'

configure()
orderStore.userSelectedBox()
render(<Order store={orderStore} />, document.querySelector('#app'));
