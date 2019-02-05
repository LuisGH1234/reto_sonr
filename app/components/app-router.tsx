import React, { Component } from 'react';
import { Switch, Route, Router } from 'react-router-dom';

import App from './app';

export default function (): JSX.Element {
    return (
        <App>
            <Switch>
                <Route path="/in" component={() => <h5>Helo world 1</h5>}/>
                <Route component={() => <h5>Page no found</h5>}/>
            </Switch>
        </App>
    );
}