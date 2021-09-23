import {
  HashRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { Link as RLink } from "react-router-dom"
import {
  Stack, Link
} from '@chakra-ui/react'
import WhoDidWhat from './WhoDidWhat';
import EnrollmentsStat from './EnrollmentsStat';

const App = () => {
  return (
    <Router>
      <Stack direction="row" spacing="10px" p="10px" textTransform="uppercase" fontSize="20px">
        <Link as={RLink} to="/">
          Statistics
        </Link>
        <Link as={RLink} to="/who-did-what">
          Who Did What
        </Link>
      </Stack>
      <Switch>
        <Route path="/" exact>
          <EnrollmentsStat />
        </Route>
        <Route path="/who-did-what">
          <WhoDidWhat />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
