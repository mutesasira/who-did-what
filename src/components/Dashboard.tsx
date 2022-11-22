import {
  Flex, Grid,
  GridItem, HStack, Stack, Text
} from "@chakra-ui/react";
import { useStore } from "effector-react";
import { useDashboard } from "../Queries";
import { $store } from "../Store";

export const formatter = Intl.NumberFormat("en", {
  notation: "standard",
  // maximumSignificantDigits: 3,
  maximumFractionDigits: 2,
  // minimumSignificantDigits: 3,
  // minimumIntegerDigits:2
});

const ST = ({
  title,
  data,
  postfix,
  direction = "column",
  color,
}: {
  data: any;
  title: string;
  postfix?: string;
  direction?: "column" | "row";
  color?: string;
}) => {
  return (
    <Stack
      spacing={direction === "column" ? 0 : "10px"}
      h="100%"
      justifyContent="center"
      alignItems="center"
      justifyItems="center"
      direction={direction}
    >
      <Text
        textTransform="uppercase"
        fontWeight="medium"
        fontSize="3.0vh"
        isTruncated
      >
        {title}
      </Text>

      <Text fontSize={"5vh"} color={color} fontWeight="bold">
        {formatter.format(Number(data))}
        {postfix}
      </Text>
    </Stack>
  );
};

const Dashboard = () => {
  const store = useStore($store);

  const { isLoading, isSuccess, isError, data, error } = useDashboard(
    store.organisationUnits.map((o) => o.id)
  );
  return (
    <Stack p="5px">
      {isLoading && <div>Loading</div>}
      {isSuccess && (
        <Grid
          overflow="auto"
          h="calc(100vh - 140px)"
          w="calc(100vw - 10px)"
          templateRows="repeat(4, 1fr)"
          gap={1}
        >
          <GridItem>
            <Stack spacing={0} h="100%" w="100%">
              <Flex
                alignItems="center"
                bg="gray.200"
                h="4vh"
                alignContent="center"
                justifyItems="center"
              >
                <Text
                  pl="25px"
                  textTransform="uppercase"
                  fontWeight="bold"
                  fontSize="1vw"
                  color="gray.500"
                  isTruncated
                >
                  Backlog
                </Text>
              </Flex>
              <HStack
                flex={1}
                justifyItems="space-around"
                justifyContent="space-around"
                h="100%"
                w="100%"
              >
                <ST
                  title="DOSE 1"
                  color="black"
                  data={
                    data.campaignData["Dose 1"] +
                    data.dailyData["Daily - Given dose 1"] -
                    data.individual.DOSE1
                  }
                />
                <ST
                  title="DOSE 2"
                  color="black"
                  data={
                    data.campaignData["Dose 2"] +
                    data.dailyData["Daily - Given dose 2"] -
                    data.individual.DOSE2
                  }
                />
                <ST
                  title="DOSE 3"
                  color="black"
                  data={0 - 0 - data.individual.DOSE3}
                />
                <ST
                  title="BOOSTER DOSES"
                  color="black"
                  data={
                    data.campaignData["Booster dose"] +
                    data.dailyData["Daily - Given booster dose"] -
                    data.individual.BOOSTER
                  }
                />
              </HStack>
            </Stack>
          </GridItem>
          <GridItem>
            <Stack spacing={0} h="100%" w="100%">
              <Flex
                alignItems="center"
                bg="gray.200"
                h="4vh"
                alignContent="center"
                justifyItems="center"
              >
                <Text
                  pl="25px"
                  textTransform="uppercase"
                  fontWeight="bold"
                  fontSize="1vw"
                  color="gray.500"
                  isTruncated
                >
                  Individual Summaries
                </Text>
              </Flex>

              <HStack
                flex={1}
                justifyItems="space-around"
                justifyContent="space-around"
                h="100%"
                w="100%"
              >
                <ST title="DOSE 1" color="black" data={data.individual.DOSE1} />
                <ST title="DOSE 2" color="black" data={data.individual.DOSE2} />
                <ST title="DOSE 3" color="black" data={data.individual.DOSE3} />
                <ST
                  title="BOOSTER DOSES"
                  color="black"
                  data={data.individual.BOOSTER}
                />
              </HStack>
            </Stack>
          </GridItem>
          <GridItem>
            <Stack spacing={0} h="100%" w="100%">
              <Flex
                alignItems="center"
                bg="gray.200"
                h="4vh"
                alignContent="center"
                justifyItems="center"
              >
                <Text
                  pl="25px"
                  textTransform="uppercase"
                  fontWeight="bold"
                  fontSize="1vw"
                  color="gray.500"
                  isTruncated
                >
                  Campaign Summaries
                </Text>
              </Flex>
              <HStack
                flex={1}
                justifyItems="space-around"
                justifyContent="space-around"
                h="100%"
                w="100%"
              >
                <ST
                  title="DOSE 1"
                  color="black"
                  data={data.campaignData["Dose 1"]}
                />
                <ST
                  title="DOSE 2"
                  color="black"
                  data={data.campaignData["Dose 2"]}
                />
                <ST title="DOSE 3" color="black" data={0} />
                <ST
                  title="BOOSTER DOSES"
                  color="black"
                  data={data.campaignData["Booster dose"]}
                />
              </HStack>
            </Stack>
          </GridItem>
          <GridItem>
            <Stack spacing={0} h="100%" w="100%">
              <Flex
                alignItems="center"
                bg="gray.200"
                h="4vh"
                alignContent="center"
                justifyItems="center"
              >
                <Text
                  pl="25px"
                  textTransform="uppercase"
                  fontWeight="bold"
                  fontSize="1vw"
                  color="gray.500"
                  isTruncated
                >
                  Daily Summaries
                </Text>
              </Flex>
              <HStack
                flex={1}
                justifyItems="space-around"
                justifyContent="space-around"
                h="100%"
                w="100%"
              >
                <ST
                  title="DOSE 1"
                  color="black"
                  data={data.dailyData["Daily - Given dose 1"]}
                />
                <ST
                  title="DOSE 2"
                  color="black"
                  data={data.dailyData["Daily - Given dose 2"]}
                />
                <ST title="DOSE 3" color="black" data={0} />
                <ST
                  title="BOOSTER DOSES"
                  color="black"
                  data={data.dailyData["Daily - Given booster dose"]}
                />
              </HStack>
            </Stack>
          </GridItem>
        </Grid>
      )}
      {isError && <pre>{JSON.stringify(error, null, 2)}</pre>}
    </Stack>
  );
};

export default Dashboard;
