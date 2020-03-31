import React from 'react';
import { Route } from 'react-router'
import { ConnectedRouter } from 'connected-react-router';
import Index from './components/containers/Content/Index';
import Login from './components/containers/Auth/Login';
import Header from './components/containers/Menu/Header';
import Menu from './components/containers/Menu/Menu';
import ProfileSettings from './components/containers/Content/ProfileSettings';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = ({history}) => {
        return (
            <ConnectedRouter history={history}>
                <Route path="/" component={Header}/>
                <Route exact path="/" component={Index}/>
                <Route exact path="/profile/settings" component={ProfileSettings}/>
                <Route exact path="/login" component={Login}/>
                <Route path="/" component={Menu}/>
            </ConnectedRouter>
            )
};

export default App;
