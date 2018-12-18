import React from 'react';
import ReactDOM from 'react-dom';
import { CircularProgress } from '@material-ui/core';
import 'typeface-roboto';

const App = React.lazy(() => import('./js/components/App'));

ReactDOM.render(
  <React.Suspense fallback={<CircularProgress />}>
    <App />
  </React.Suspense>,
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
