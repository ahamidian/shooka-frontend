import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import DefaultLayout from "./components/DefaultLayout.js";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux'
import reducers from "./reducers";
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {PersistGate} from 'redux-persist/integration/react'
import Login from './pages/Login/Login'
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'layout']
};

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);
// persistor.purge();

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <BrowserRouter>
                        <Switch>
                            <Route exact path="/login" name="Login Page" component={Login}/>
                            <Route path="/" name="Home" component={DefaultLayout}/>
                        </Switch>
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        );
    }
}

export default App;
