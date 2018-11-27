import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/components/App';
import 'typeface-roboto';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./js/components/App', () => {
    // eslint-disable-next-line
    console.log('Change detected! Hot reloading...');
  });
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js')
      .then((reg) => {
        console.log('Worker loaded');
        console.log(`Scope is: ${reg.scope}`);
      })
      .catch((err) => {
        console.error(err);
      });
  });
}
