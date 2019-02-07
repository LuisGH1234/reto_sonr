import React from 'react';
import ReactDOM from 'react-dom';
//import { BrowserRouter } from 'react-router-dom';

import AppRouter from './components/app-router';

const app = document.getElementById("app");

ReactDOM.render( <AppRouter/> , app);