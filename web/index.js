import ReactDOM from "react-dom";

import App from './App';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker
      .register('./worker.js')
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  });
}

const rootElement = document.getElementById('app');
ReactDOM.render(
  <App />,
  rootElement
);
