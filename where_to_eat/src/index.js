import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CanteenGallery from './nav.js'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<CanteenGallery />, document.getElementById('Menu'));

registerServiceWorker();
