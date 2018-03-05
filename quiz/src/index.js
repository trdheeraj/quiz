import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './bootstrap/css/bootstrap-responsive.min.css';
import './bootstrap/css/bootstrap.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
