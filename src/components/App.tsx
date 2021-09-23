import {
  HashRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import EnrollmentsStat from './EnrollmentsStat'
import Details from './Details'
import { useD2 } from "../Context";

const App = () => {
  const d2 = useD2();
  return (
    <>
    <Router>
      <Switch>
        <Route path="/">
          < EnrollmentsStat />
          </Route>
          <Route path="/details">
          < Details />
        </Route>
      </Switch>
      </Router>
    </>
  );
};

export default App;
