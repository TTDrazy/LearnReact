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
import {BrowserRouter as Router,Route,} from 'react-router-dom';
import TodoForm from './view/todo/TodoForm.js';
import TodoEdit from './view/todo/TodoEdit.js';
import Count from './components/count/Count';
import CountStore from './stores/CountStore';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/user/Home.js';
import UserStore from './stores/UserStore.js';
let store = new Store();
let todoStore = new TodoStore();
let countStore = new CountStore();
let userStore = new UserStore();

ReactDOM.render(
    <Provider  store={store} todoStore={todoStore} countStore = {countStore} userStore = {userStore}>
        <Router>
            <LocaleProvider locale={zh_CN}>
                <App>
                    <Route exact path={RouterVar.Home} component={Index} />
                    <Route exact path={RouterVar.TodoRouter.TODO} component={Todo} />
                    <Route exact path={RouterVar.TodoRouter.TODOADD} component={TodoForm} />
                    <Route exact path={RouterVar.TodoRouter.TODOEDIT} component={TodoEdit}/>
                    <Route exact path='/count' component={Count}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/register' component={Register}/>
                    <Route exact path='/user' component={Home}/>
                </App>
            </LocaleProvider>
        </Router>
    </Provider>
    , document.getElementById('root'));