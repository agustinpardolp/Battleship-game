import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import TopBar from "../components/topBar";
import Home from "./Home/";
import Game from "./Game/";


function Main() {
  return (
    <div className="App">
      <div className="App-header">
        <TopBar />
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/game" component={Game} />
          <Redirect from = "/" to= "/home"/>
        </Switch>
      </div>
    </div>
  );
}

export default Main;