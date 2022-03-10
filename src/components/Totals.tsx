import { ChangeEvent, useState, KeyboardEvent } from "react";
import {
  Box,
  Center,
  Flex,
  Heading,
  Input,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Button,
  ButtonGroup,
  Spinner,
} from "@chakra-ui/react";
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import {
  Pagination,
  PaginationContainer,
  PaginationNext,
  PaginationPage,
  PaginationPageGroup,
  PaginationPrevious,
  PaginationSeparator,
  usePagination,
} from "@ajna/pagination";
import { OrgUnit } from "./OrgUnit";
import { useSqlViewOus } from "../Queries";
import { useStore } from "effector-react";
import { $store } from "../Store";
import moment from "moment";

const { RangePicker } = DatePicker;

const OUTER_LIMIT = 4;
const INNER_LIMIT = 4;

const Totals = () => {
  const store = useStore($store);
  const [date, setDate] = useState<[any, any]>([moment(), moment()]);

  const [selectedDate, setSelectedDate] = useState<[string, string]>([
    date[0].format("YYYY-MM-DD"),
    date[1].format("YYYY-MM-DD"),
  ]);

  const { isLoading, isSuccess, isError, data, error } = useSqlViewOus(
    selectedDate[0],
    selectedDate[1]
  );

  const changeSearch = () => {
    setSelectedDate([
      date[0].format("YYYY-MM-DD"),
      date[1].format("YYYY-MM-DD"),
    ]);
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
      <Table variant="striped" w="100%">
        <Thead>
          <Tr>
            <Th textAlign="center">District Name</Th>
            <Th textAlign="center">Enrollments Created</Th>
            <Th textAlign="center">Events Created</Th>
            <Th textAlign="center">Events Completed</Th>
          </Tr>
        </Thead>
        {isLoading && (
          <Tbody>
            <Tr>
              <Td colSpan={6} textAlign="center">
                Loading
              </Td>
            </Tr>
          </Tbody>
        )}
        {isSuccess && (
          <Tbody>
            {/* {data.map((district: any) => { */}
            return (
            <Tr colSpan={6}>
              <Td textAlign="center">
                <pre>{JSON.stringify(data, null, 2)}</pre>
              </Td>
            </Tr>
            );
            {/* })} */}
          </Tbody>
        )}
      </Table>
      {isError && <div>{error.message}</div>}
    </Flex>
  );
};

export default Totals;
