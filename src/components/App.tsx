import {
  HashRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { Link as RLink } from "react-router-dom"
import {
  Stack, Link, Grid, GridItem
} from '@chakra-ui/react'
import WhoDidWhat from './WhoDidWhat';
import EnrollmentsStat from './EnrollmentsStat';

const App = () => {
  return (
    <Router>
      <Stack direction="row" spacing="10px" p="10px" ml={6} textTransform="uppercase" fontSize="20px">
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          <Link as={RLink} to="/" colorScheme="teal"
            _hover={{
              background: "white",
              color: "teal.500",
            }}
            _focus={{
              background: "white",
              color: "teal.500",
            }}
          >
            Statistics
          </Link>
          <Link as={RLink} to="/who-did-what" _hover={{
            background: "white",
            color: "teal.500",
          }}
          _focus={{
            background: "white",
            color: "teal.500",
          }}
          >
            Who Did What
          </Link>
        </Grid>
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
