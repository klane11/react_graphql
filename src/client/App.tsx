import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { ThemeProvider } from "styled-components";

import './App.css';
import { AppWrapper } from "./components/app-wrapper";
import { Directory } from './components/pages/directory';
import { EditEmployee } from "./components/pages/edit-employee";
import { theme } from './theme';

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </Router>
  );
}

export default App;
