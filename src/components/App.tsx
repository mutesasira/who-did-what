import {
  HashRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import { Link as RLink } from "react-router-dom"
import {
  Stack, Link, Grid, GridItem, Box, Center
} from '@chakra-ui/react'
import WhoDidWhat from './WhoDidWhat';
import EnrollmentsStat from './EnrollmentsStat';
import { useLoader } from "../Queries";
import { useD2 } from "../Context";

const App = () => {
  const d2 = useD2()
  const { isLoading, isError, isSuccess, error } = useLoader(d2)
  return (
    <>
      {isLoading && <Box>Loading</Box>}
      {isSuccess && <Router>
        <Stack direction="row" spacing="10px" p="10px" ml={4} mr={4} textTransform="uppercase" w='full' fontSize="35px">
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
