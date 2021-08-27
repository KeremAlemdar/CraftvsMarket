import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Profit from './Profit';

function App() {
  // const [employees, setEmployees] = useState<EmployeeType[]>();
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
