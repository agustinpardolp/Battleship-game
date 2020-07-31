import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import TopBar from "./components/topBar";
import Home from "./screens/Home/";
import Game from "./screens/Game/";
import Result from "./screens/Result/";

import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <TopBar />
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/game" component={Game} />
          <Route exact path="/result" component={Result} />
          <Redirect from = "/" to= "/home"/>
        </Switch>
      </div>
    </div>
  );
}

export default App;
