
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Main from "../src/screens/";
import 'semantic-ui-css/semantic.min.css'
import "./App.css";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route>
          <Main/>
        </Route>
      </Router>
    </Provider>
  );
}

export default App;