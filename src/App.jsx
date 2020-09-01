import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Login from './Login';
import ProtectedRoute from './data/router/protected_route';
import MainMenu from './MainMenu';

const App = () => (
  <Router> 
    <MainMenu/>
    <Switch>
      <Route path="/login" exact component={Login} />
      <ProtectedRoute path="/" exact component={Home} />
      <Route component={() =>
        <div>
          <h1>Error 404</h1>
          <span>Página no encontrada</span>
        </div>
      } />
    </Switch>
  </Router>
)

export default App;
