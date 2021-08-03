import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Chat from "./components/Chat";
import Login from "./components/Login";
import Sidebar from "./components/Sidebar";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    //BEM naming convention
    <div className="app">
      {!user ? (
        <Login />
      ) : 
      (
        <div className="app_body">
          <Router>
            <Sidebar />
            <Switch>
              <Route exact path="/">
                <Chat />
              </Route>
              <Route path="/chatRooms/:roomId">
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
      )}
    </div>
  );
}

export default App;
