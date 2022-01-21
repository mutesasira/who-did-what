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
import { useEnrollmentOUCount } from "../Queries";
import { useStore } from "effector-react";
import { $store } from "../Store";
import moment from "moment";

const { RangePicker } = DatePicker;

const OUTER_LIMIT = 4;
const INNER_LIMIT = 4;

const Totals = () => {
  const store = useStore($store);
  const [date, setDate] = useState<[any, any]>([moment(), moment()]);
  const [q, setQ] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const {
    pages,
    pagesCount,
    offset,
    currentPage,
    setCurrentPage,
    isDisabled,
    pageSize,
    setPageSize,
  } = usePagination({
    total: store.total,
    limits: {
      outer: OUTER_LIMIT,
      inner: INNER_LIMIT,
    },
    initialState: {
      pageSize: 10,
      currentPage: 1,
    },
  });

  const handlePageChange = (nextPage: number): void => {
    setCurrentPage(nextPage);
  };

  const handlePageSizeChange = (
    event: ChangeEvent<HTMLSelectElement>
  ): void => {
    const pageSize = Number(event.target.value);
    setPageSize(pageSize);
    setCurrentPage(1);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setQuery(q);
      setCurrentPage(1);
    }
  };

  const { isLoading, isSuccess, isError, data, error } = useEnrollmentOUCount(
    currentPage,
    pageSize,
    date[0].format("YYYY-MM-DD"),
    date[1].format("YYYY-MM-DD")
  );
  return (
    <Flex justifyItems="center" direction="column">
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <Heading as="h3" size="lg" p={4} color="gray" justifyContent="center">
        Total Statistics
      </Heading>
      <Box p={4} d="flex">
        <Input
          placeholder="Search by district"
          w={500}
          value={q}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQ(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Box ml={50}>
          <RangePicker size="large" value={date} onChange={setDate} />
        </Box>
        <Box ml={50}>
          <Button colorScheme="blue">Submit</Button>
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
            {data.map((district: any) => {
              return (
                <Tr key={district.name}>
                  <Td textAlign="center">{district.name}</Td>
                  <Td textAlign="center">{district.enrollments}</Td>
                  <Td textAlign="center">{district.events}</Td>
                  <Td textAlign="center">{district.completed}</Td>
                </Tr>
              );
            })}
          </Tbody>
        )}
      </Table>
      <Pagination
        pagesCount={pagesCount}
        currentPage={currentPage}
        isDisabled={isDisabled}
        onPageChange={handlePageChange}
      >
        <PaginationContainer
          align="center"
          justify="space-between"
          p={4}
          w="full"
        >
          <PaginationPrevious
            _hover={{
              bg: "yellow.400",
            }}
            bg="yellow.300"
          >
            <Text>Previous</Text>
          </PaginationPrevious>
          <PaginationPageGroup
            isInline
            align="center"
            separator={
              <PaginationSeparator
                onClick={() => console.warn("I'm clicking the separator")}
                bg="blue.300"
                fontSize="sm"
                w={14}
                jumpSize={11}
              />
            }
          >
            {pages.map((page: number) => (
              <PaginationPage
                w={14}
                bg="red.300"
                key={`pagination_page_${page}`}
                page={page}
                fontSize="sm"
                _hover={{
                  bg: "green.300",
                }}
                _current={{
                  bg: "green.300",
                  fontSize: "sm",
                  w: 14,
                }}
              />
            ))}
          </PaginationPageGroup>
          <PaginationNext
            _hover={{
              bg: "yellow.400",
            }}
            bg="yellow.300"
          >
            <Text>Next</Text>
          </PaginationNext>
        </PaginationContainer>
      </Pagination>
      <Center w="full">
        <Text>Records per page</Text>
        <Select ml={3} onChange={handlePageSizeChange} w={40} value={pageSize}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
          <option value="200">200</option>
        </Select>
      </Center>
      {isError && <div>{error.message}</div>}
    </Flex>
  );
};

export default Totals;
