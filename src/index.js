import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.js'
import Store from './stores/Store'
import TodoStore from './stores/TodoStore'

import Todo from './view/todo/todo';
import Index from './view/Index';
import RouterVar from './contants/Router'
import { LocaleProvider } from 'antd';
import { Provider } from 'mobx-react';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

let store = new Store();
let todoStore = new TodoStore();
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'
import TodoForm from './view/todo/TodoForm.js';

ReactDOM.render(
    <Provider  store={store} todoStore={todoStore}>
        <Router>
            <LocaleProvider locale={zh_CN}>
                <App>
                    <Route exact path={RouterVar.Home} component={Index} />
                    <Route path={RouterVar.TodoRouter.TODO} component={Todo} />
                    <Route exact path={RouterVar.TodoRouter.TODOADD} component={TodoForm} />
                </App>
            </LocaleProvider>
        </Router>
    </Provider>
    , document.getElementById('root'));