import { Box, Button, Grid, Stack } from "@chakra-ui/react";
import {
  Link,
  Outlet,
  ReactLocation,
  Router,
  createHashHistory,
} from "react-location";
import { useLoader } from "../Queries";
import { Routes } from "./Routes";

const hashHistory = createHashHistory();

const location = new ReactLocation({ history: hashHistory });

const App = () => {
  const { isLoading, isError, isSuccess, error } = useLoader();
  return (
    <>
      {isLoading && <Box>Loading</Box>}
      {isSuccess && (
        <Router location={location} routes={Routes}>
          <Stack
            direction="row"
            spacing="10px"
            p="10px"
            ml={4}
            mr={4}
            textTransform="uppercase"
            fontSize="35px"
          >
            <Grid templateColumns="repeat(4, 1fr)" w={"full"} gap={1}>
              <Link
                to="/"
                getActiveProps={() => ({
                  style: { color: "#4299E1" },
                })}
              >
                <Button
                  flex={1}
                  fontSize={"2xl"}
                  size="lg"
                  textTransform="uppercase"
                  w="100%"
                >
                  Dashboard
                </Button>
              </Link>

              <Link
                to="/statistics"
                getActiveProps={() => ({
                  style: { color: "#4299E1" },
                })}
              >
                <Button
                  flex={1}
                  fontSize={"2xl"}
                  size="lg"
                  textTransform="uppercase"
                  w="100%"
                >
                  User Statistics
                </Button>
              </Link>

              <Link
                to="/wdw"
                getActiveProps={() => ({
                  style: { color: "#4299E1" },
                })}
              >
                <Button flex={1} fontSize={"2xl"} size="lg" w="100%">
                  DETAILS
                </Button>
              </Link>

              <Link
                to="/district-summaries"
                getActiveProps={() => ({
                  style: { color: "#4299E1" },
                })}
              >
                <Button
                  flex={1}
                  fontSize={"2xl"}
                  size="lg"
                  textTransform="uppercase"
                  w="100%"
                >
                  District Summary
                </Button>
              </Link>
            </Grid>
          </Stack>
          <Outlet />
        </Router>
      )}
      {isError && <Box>{error.message}</Box>}
    </>
  );
};

export default App;
