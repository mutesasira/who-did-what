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
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Select,
  Spacer,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useDataEngine } from "@dhis2/app-runtime";
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import { useStore } from "effector-react";
import moment from "moment";
import { ChangeEvent, useState } from "react";
import * as XLSX from "xlsx";
import { useSQLView } from "../Queries";
import { $store } from "../Store";

const { RangePicker } = DatePicker;

const OUTER_LIMIT = 4;
const INNER_LIMIT = 4;

const EventsStat = () => {
  const [date, setDate] = useState<[any, any]>([moment(), moment()]);
  const [downloading, setDownloading] = useState<boolean>(false);
  const engine = useDataEngine();

  const [selectedDate, setSelectedDate] = useState<[string, string]>([
    date[0].format("YYYY-MM-DD"),
    date[1].format("YYYY-MM-DD"),
  ]);
  const [query, setQuery] = useState<string>("");
  const [q, setQ] = useState<string>("");
  const store = useStore($store);
  const {
    pages,
    pagesCount,
    currentPage,
    setCurrentPage,
    isDisabled,
    pageSize,
    setPageSize,
  } = usePagination({
    total: store.total.gYKNziyGEIz,
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

  const changeSearch = () => {
    setQuery(q);
    setCurrentPage(1);
    setSelectedDate([
      date[0].format("YYYY-MM-DD"),
      date[1].format("YYYY-MM-DD"),
    ]);
  };
  const { isError, isLoading, isSuccess, error, data } = useSQLView(
    currentPage,
    pageSize,
    "gYKNziyGEIz",
    selectedDate[0],
    selectedDate[1],
    store.organisationUnits,
    query
  );

  const downloadEvents = async () => {
    setDownloading(true);
    const queries = [
      `var=start:${selectedDate[0]}`,
      `var=end:${selectedDate[1]}`,
      `var=units:${store.organisationUnits.map((o: any) => o.id).join("-")}`,
      `var=username:${query === "" ? " " : query}`,
      `paging=false`,
    ].join("&");

    const sqlViewQuery = {
      data: {
        resource: `sqlViews/gYKNziyGEIz/data?${queries}`,
      },
    };
    const {
      data: {
        listGrid: { rows, headers },
      },
    }: any = await engine.query(sqlViewQuery);
    const all = [
      [
        "Username",
        "Full Name",
        "Phone Contact",
        "Active Events",
        "Completed Events",
        "Total Events",
      ],
      ...rows.map((r: any[]) => {
        return [
          r[0],
          store.users[r[0]].displayName,
          store.users[r[0]].phoneNumber,
          r[1],
          r[2],
          r[1] + r[2],
        ];
      }),
    ];
    const sheetName = "Events";
    const filename = `Events-${store.organisationUnits
      .map((o: any) => o.name)
      .join("-")}-${selectedDate[0]}-${selectedDate[1]}.xlsx`;
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(all);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, filename);
    setDownloading(false);
  };
  return (
    <Flex justifyItems="center" direction="column">
      <Heading as="h3" size="lg" p={4} color="gray" justifyContent="center">
        Summary Statistics
      </Heading>
      <Stack p={4} direction="row" spacing={50}>
        <Input
          placeholder="Search by User Name"
          w={500}
          value={q}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQ(e.target.value)}
        />
        <RangePicker size="large" value={date} onChange={setDate} />

        <Button colorScheme="blue" onClick={changeSearch} isLoading={isLoading}>
          Submit
        </Button>
        <Spacer />
        <Button
          colorScheme="blue"
          onClick={downloadEvents}
          isLoading={downloading}
        >
          Download
        </Button>
      </Stack>
      <Box p={4} m={4} borderWidth="1px" borderRadius="lg">
        <Table variant="striped" w="100%">
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Full Name</Th>
              <Th>Contact</Th>
              <Th textAlign="center">Active Events</Th>
              <Th textAlign="center">Completed Created</Th>
              <Th textAlign="center">Total Events</Th>
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
              {data.listGrid.rows.map((row: any) => {
                return (
                  <Tr key={row[0]}>
                    <Td>{row[0]}</Td>
                    <Td>{store.users[row[0]].displayName}</Td>
                    <Td>{store.users[row[0]].phoneNumber}</Td>
                    <Td textAlign="center">{row[1]}</Td>
                    <Td textAlign="center">{row[2]}</Td>
                    <Td textAlign="center">{row[1] + row[2]}</Td>
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
          <Select
            ml={3}
            onChange={handlePageSizeChange}
            w={40}
            value={pageSize}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </Select>
        </Center>
      </Box>
      {isError && <Box>{error.message}</Box>}
    </Flex>
  );
};

export default EventsStat;
