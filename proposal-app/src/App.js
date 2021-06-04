import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "./components/navbar";
import Main from "./pages/main";
import Submission from "./pages/submission";
import history from "./history";
import "./assets/css/App.css";
import "./assets/css/bootstrap.css";
// import "./assets/css/custom.css";
// import "./assets/css/font-awesome.css";
// import "./assets/css/basic.css";
// import "./assets/css/pricing.css";
// import "./assets/css/bootstrap-fileupload.min.css";

function App() {
  return (
    <div className="container">
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route path="/submission" component={Submission} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
