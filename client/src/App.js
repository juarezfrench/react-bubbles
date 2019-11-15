import React from "react";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import BubblePage from "./components/BubblePage";
import ColorList from "./components/ColorList";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/protected">Bubbles!</Link>
          </li>
        </ul>
        <Switch>
          <PrivateRoute exact path="/protected" component={BubblePage} />
          <PrivateRoute exact path="/protected/add" component={ColorList} />
          <Route path="/login" component={Login} />
          <Route component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
