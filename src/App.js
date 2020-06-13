import './App.css';

import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import NavBar from "./components/NavBar";
import Players from "./components/Players";
import Player from "./components/Player";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <NavBar/>
                <div className="App">
                    <Switch>
                        <Route path="/" exact component={Players} />
                        <Route path="/:id" component={Player} />
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
