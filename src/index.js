import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AdminApp from './admin/App';
import App from './app/App';
import Header from './components/Header';
import { Route, Switch } from 'react-router-dom';
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
        <Switch>
          <Route path="/admin/" component={AdminApp} />
          <Route path="/" component={App} />
        </Switch>
      </div>
    </ConnectedRouter>
  </Provider>,
  target
)
registerServiceWorker();
