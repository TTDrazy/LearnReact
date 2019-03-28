import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'
import Store from './stores/Store'

import Todo from './view/todo/todo';
import Index from './view/Index';

let store = new Store();
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import TodoForm from './view/todo/TodoForm.js';

ReactDOM.render(
    <Router>
        <App store={store} >
            <Route exact path="/" component={Index} />
            <Route path="/todo" component={Todo} />
            <Route exact path="/todoAdd" component={TodoForm} />
        </App>
    </Router>
    , document.getElementById('root'));