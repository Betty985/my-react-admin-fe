import React, { FC } from 'react';
// import { Routes, Route } from "react-router-dom";
import Header from './components/Header';
// import Login from "./pages/Login";
// import PrivateRoute from "./components/PrivateRoute";
// import Settings from "./pages/Settings";
// import Test from "./components/ArticleList";

import { routes, RouterGuard } from './router';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import stores from './stores';
import ErrorBoundary from './components/ErrorBoundary';
const App = () => (
    <ErrorBoundary>
        <Provider {...stores}>
            <Router basename={window.__POWERED_BY_QIANKUN__ ? '/conduit' : '/'}>
                <Header />
                <RouterGuard routes={routes} />
            </Router>
        </Provider>
    </ErrorBoundary>
);
export default App;
