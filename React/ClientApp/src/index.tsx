import 'bootstrap/dist/css/bootstrap.css';
import './css/application.css'

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { store } from './store';
import registerServiceWorker from './registerServiceWorker';
import Menu from './components/menu';
import Login from './security/login';

// Create browser history to use in the Redux store
const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href') as string;

const history = createBrowserHistory({ basename: baseUrl });

ReactDOM.render(
    <Provider store={store}>
        <Router history={history} >
            <Menu />
            <main>
                <Route exact path='/'>
                    Хуй
            </Route>
                <Route path='/login' component={Login} />
            </main>
        </Router>
    </Provider>,
    document.getElementById('root'));

registerServiceWorker();