import './index.css';

import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { App } from './App';
import registerServiceWorker from './registerServiceWorker';

// tslint:disable-next-line:no-console
ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
