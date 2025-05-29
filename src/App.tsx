import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Profit from './Profit';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            <Profit />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
