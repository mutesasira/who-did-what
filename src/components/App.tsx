import { Box, Center, Grid, Link, Stack } from '@chakra-ui/react';
import {
  HashRouter as Router, Link as RLink, Route,
  Switch
} from "react-router-dom";
import { useLoader } from "../Queries";
import EnrollmentsStat from './EnrollmentsStat';
import WhoDidWhat from './WhoDidWhat';

const App = () => {
  const { isLoading, isError, isSuccess, error } = useLoader()
  return (
    <>
      {isLoading && <Box>Loading</Box>}
      {isSuccess && <Router>
        <Stack direction="row" spacing="10px" p="10px" ml={4} mr={4} textTransform="uppercase" fontSize="35px">
          <Grid templateColumns="repeat(2, 1fr)" w={'full'} gap={0}
          >

            <Link as={RLink} to="/" colorScheme="teal"
              _hover={{
                background: "white",
                color: "teal",
              }}
              _focus={{
                background: "teal",
                color: "black",
              }}
            >
              <Center bg="gray.200" h="60px" color ="teal" fontWeight="bold">Statistics</Center>
            </Link>

            <Link as={RLink} to="/who-did-what" _hover={{
              background: "white",
              color: "teal",
            }}
              _focus={{
                background: "teal",
                color: "teal",
              }}
            >
              <Center bg="gray.300" color ="teal" h="60px" fontWeight="bold" >Details</Center>
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
      </Router>}
      {isError && <Box>{error.message}</Box>}
    </>
  );
};

export default App;
