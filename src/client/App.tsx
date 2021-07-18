import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import './App.css';
import { PageWrapper } from "./components/page-wrapper";
import { Directory } from './components/pages/directory';

function App() {
  return (
    <PageWrapper>
      <Router>
        <Switch>
          <Route path="/directory">
            <Directory />
          </Route>
          <Route path="/edit-employee">
            <></>
          </Route>
          <Route path="/">
            <Redirect to="/directory" />
          </Route>
        </Switch>
      </Router>
    </PageWrapper>
  );
}

export default App;
