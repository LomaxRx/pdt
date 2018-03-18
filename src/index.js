import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AdminApp from './admin/App';
import Header from './components/Header';
import { Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'


const target = document.querySelector('#root')

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className="app">
      <Header />
        <Route path="/admin/" component={AdminApp} />
      </div>
    </ConnectedRouter>
  </Provider>,
  target
)
registerServiceWorker();
