import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import './App.css';
import { AppWrapper } from "./components/app-wrapper";
import { Directory } from './components/pages/directory';
import { EditEmployee } from "./components/pages/edit-employee";

function App() {
  return (
    <Router>
      <AppWrapper>
        <Switch>
          <Route path="/directory">
            <Directory />
          </Route>
          <Route path="/edit-employee">
            <EditEmployee />
          </Route>
          <Route path="/">
            <Redirect to="/directory" />
          </Route>
        </Switch>
      </AppWrapper>
    </Router>
  );
}

export default App;
