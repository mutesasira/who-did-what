

import { Box, HStack, Grid, Link, Stack, Button, Flex } from "@chakra-ui/react";
import {
  HashRouter as Router,
  Link as RLink,
  Route,
  Switch,
} from "react-router-dom";
import { useLoader } from "../Queries";
import EnrollmentsStat from "./EnrollmentsStat";
import WhoDidWhat from "./WhoDidWhat";
import Totals from "./Totals";

const App = () => {
  const { isLoading, isError, isSuccess, error } = useLoader();
  return (
    <>
      {isLoading && <Box>Loading</Box>}
      {isSuccess && (
        <Router>
          <Stack
            direction="row"
            spacing="10px"
            p="10px"
            ml={4}
            mr={4}
            textTransform="uppercase"
            fontSize="35px"
          >
            <Grid templateColumns="repeat(3, 1fr)" w={'full'} gap={1}
          >
              <Link as={RLink} to="/">
                <Button
                  flex={1}
                  fontSize={"2xl"}
                  size='lg'
                  w="100%"
                  bg={"gray.200"}
                  _hover={{
                    bg: "blue.400",
                    color: "white",
                  }}
                  _focus={{
                    bg: "blue.400",
                    color: "white",
                  }}
                >
                  STATISTICS
                </Button>
              </Link>

              <Link as={RLink} to="/who-did-what">
                <Button
                  flex={1}
                  fontSize={"2xl"}
                  size='lg'
                  bg={"gray.300"}
                  w="100%"
                  _hover={{
                    bg: "blue.400",
                    color: "white",
                  }}
                  _focus={{
                    bg: "blue.400",
                    color: "white",
                  }}
                >
                  DETAILS
                </Button>
              </Link>
              <Link as={RLink} to="/totals">
                <Button
                  flex={1}
                  fontSize={"2xl"}
                  size='lg'
                  bg={"gray.400"}
                  w="100%"
                  _hover={{
                    bg: "blue.400",
                    color: "white",
                  }}
                  _focus={{
                    bg: "blue.400",
                    color: "white",
                  }}
                >
                  TOTALS
                </Button>
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
            <Route path="/totals">
              <Totals />
            </Route>
          </Switch>
        </Router>
      )}
      {isError && <Box>{error.message}</Box>}
    </>
  );
};

export default App;

