import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import "./App.css";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    //BEM naming convention
    <div className="app">
      <div className="app_body">
        <Router>
          <Sidebar />
          <Switch>
            <Route exact path="/">
              <Chat />
            </Route>
            <Route path="/chatApps/:roomId">
              <Chat />
            </Route>
            {/* <Route exact path="/">
              <h1>HomeScreen</h1>
            </Route>
            <Route path="/app">
              <Sidebar />
              <Chat />
            </Route> */}
          </Switch>
        </Router>
      </div>
    </div>
  );
}

export default App;
