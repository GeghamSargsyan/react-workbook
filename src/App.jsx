import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import store from './store';

import { ProtectedRoute } from './routers';

import Home from './pages/home';
import WorkerAdd from './pages/worker-add';
import NotFound from './pages/notfound';
import Worker from './pages/worker';
import Auth from './pages/auth';

import './styles/main.scss';
import WorkerEdit from './pages/worker-edit';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Switch>
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/login" component={Auth} />
            <ProtectedRoute exact path="/user/:id" component={Worker} />
            <ProtectedRoute exact path="/worker-add" isAdmin component={WorkerAdd} />
            <ProtectedRoute exact path="/worker-edit/:id" isAdmin component={WorkerEdit} />
            <Route exact path="*" component={NotFound} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
