import {
  HashRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { Link as RLink } from "react-router-dom"
import {
  Stack, Link, Grid, GridItem
  Stack, Link, Box
} from '@chakra-ui/react'
import WhoDidWhat from './WhoDidWhat';
import EnrollmentsStat from './EnrollmentsStat';
import { useLoader } from "../Queries";
import { useD2 } from "../Context";

const App = () => {
  const d2 = useD2()
  const { isLoading, isError, isSuccess, error } = useLoader(d2)
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

    <>
      {isLoading && <Box>Loading</Box>}
      {isSuccess && <Router>
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
      </Router>}
      {isError && <Box>{error.message}</Box>}
    </>
  );
};

export default App;
