import React from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';

import AppLayout from './appLayout';
import LoginPage from './loginPage';
import Administration from './administracion';

export default function (): JSX.Element {
    return (
        <Router>
            <Switch>
                <Route exact path="/" render={() => <Redirect to="/categorias" />}/>
                <Route path="/categorias" component={AppLayout}/>
                <Route exact path="/login" component={LoginPage}/>
                <Route path="/administracion" component={Administration}/>
                <Route component={() => <h1>Page not found</h1>}/>
            </Switch>
        </Router>
    );
}