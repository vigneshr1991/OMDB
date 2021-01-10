import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Layout from "./Components/Layout/Layout";
import NoMatch from "./Components/NoMatch";

// Lazy loaded
const Home = React.lazy(() => import ("./Components/Home"));
const Movies = React.lazy(() => import ("./Components/Movies"));

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<span>Loading....</span>}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/movies" component={Movies} />
            <Route component={NoMatch} />
          </Switch>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
