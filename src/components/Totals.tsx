import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import { useStore } from "effector-react";
import moment from "moment";
import { useState } from "react";
import { useDistricts } from "../Queries";
import { $store } from "../Store";

const { RangePicker } = DatePicker;

const Totals = () => {
  const store = useStore($store);
  const [date, setDate] = useState<[any, any]>([moment(), moment()]);

  const [selectedDate, setSelectedDate] = useState<[string, string]>([
    null,
    null,
  ]);

  const { isLoading, isSuccess, isError, data, error } = useDistricts(
    store.organisationUnits.map((o: any) => String(o.id).toLowerCase()),
    selectedDate[0],
    selectedDate[1]
  );

  const changeSearch = () => {
    setSelectedDate([
      date[0].format("YYYY-MM-DD"),
      date[1].format("YYYY-MM-DD"),
    ]);
  };
  const findCompleted = (row: any) => {
    const found = row.status.buckets.find(
      (bucket: any) => bucket.key === "COMPLETED"
    );
    if (found) {
      return found.doc_count;
    }
    return 0;
  };
  return (
    <Flex justifyItems="center" direction="column">
      <Heading as="h3" size="lg" p={4} color="gray" justifyContent="center">
        Total Statistics
      </Heading>
      <Box p={4} d="flex">
        <Box ml={50}>
          <RangePicker size="large" value={date} onChange={setDate} />
        </Box>
        <Box ml={50}>
          <Button colorScheme="blue" onClick={changeSearch}>
            Submit
          </Button>
        </Box>
      </Box>
      <Box overflow="auto" h="calc(100vh - 270px)">
        <Table variant="striped" w="100%">
          <Thead>
            <Tr>
              <Th>UID</Th>
              <Th>District Name</Th>
              <Th textAlign="center">Events Created</Th>
              <Th textAlign="center">Events Completed</Th>
            </Tr>
          </Thead>
          {isLoading && (
            <Tbody>
              <Tr>
                <Td colSpan={5} textAlign="center">
                  Loading
                </Td>
              </Tr>
            </Tbody>
          )}
          {isSuccess && (
            <Tbody>
              {data.summary.buckets.map((bucket: any) => {
                return (
                  <Tr key={bucket.key}>
                    <Td>{bucket.key}</Td>
                    <Td>{store.districts[bucket.key]}</Td>
                    <Td textAlign="center">{bucket.doc_count}</Td>
                    <Td textAlign="center">{findCompleted(bucket)}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          )}
        </Table>
      </Box>
      {isError && <div>{error.message}</div>}
    </Flex>
  );
};

export default Totals;
