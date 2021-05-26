import logo from "./logo.svg";
import "./App.css";
import Login from "./Login/Login";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
