import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";

import Error from "./pages/Error";
import { makeStyles } from "@material-ui/core";
import CoinPage from "./pages/CoinPage";

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App() {
  const classes = useStyles();
  return (
    <Router>
      <div className={classes.App}>
        <Header />
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/coin/:id" component={CoinPage} exact />
          <Route path="*" component={Error} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
