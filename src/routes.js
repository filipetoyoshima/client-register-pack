import React from 'react';

import { isAuthenticated } from './services/auth';

import LoginScreen from './screens/login';
import ClientsScreen from './screens/clients';
import Form from './components/clientForm';

import {
    BrowserRouter,
    Route,
    Switch,
    Redirect,
} from "react-router-dom";


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
            isAuthenticated() === true
            ? <Component {...props} />
            : <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
              }} />
        )} />
);


const Routes = () => (
        <BrowserRouter>
            <Switch>
                <Route exact path='/login' component={LoginScreen} />
                <PrivateRoute exact path='/clients' component={ClientsScreen} />
                <PrivateRoute exact path='/new_client' component={Form} />
                <Redirect from="*" to="/clients"/>
            </Switch>
        </BrowserRouter>
);

export default Routes;