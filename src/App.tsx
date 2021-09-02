import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Profit from './Profit';
import Hack from './hack';
import DataClientService from './dataClientService';
function App() {
  // const [employees, setEmployees] = useState<EmployeeType[]>();
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            <Hack />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
