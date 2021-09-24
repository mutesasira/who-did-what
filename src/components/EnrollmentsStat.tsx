import {
  Pagination, PaginationContainer, PaginationNext, PaginationPage, PaginationPageGroup, PaginationPrevious, PaginationSeparator, usePagination
} from "@ajna/pagination";
import {
  Box, Center, Flex, Heading, Input, Select, Table, Tbody, Td, Text, Th, Thead, Tr, Button, ButtonGroup 
} from "@chakra-ui/react";
import { useStore } from 'effector-react';
import { ChangeEvent, useState, KeyboardEvent } from 'react';
import { useD2 } from "../Context";
import { useEnrollmentCount } from "../Queries";
import { $store } from '../Store';
import PeriodModal from "./PeriodModal";

const OUTER_LIMIT = 4;
const INNER_LIMIT = 4;

const EnrollmentsStat = () => {
  const d2 = useD2();
  const [query, setQuery] = useState<string>('');
  const [q, setQ] = useState<string>('');
  const store = useStore($store)
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
    if (event.key === 'Enter') {
      setQuery(q)
      setCurrentPage(1);
    }
  }

  const { error, isError, isLoading, isSuccess, data } = useEnrollmentCount(d2, currentPage, pageSize, query);
  return (
    <Flex justifyItems="center" direction="column">
      <Heading as="h3" size="lg" p={4} color="gray" justifyContent="center">
        Summary Statistics
      </Heading>
      <Box p={4} d="flex">
        <Input
          placeholder="Search by User Name"
          w={500} value={q}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQ(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      <Box ml={50} colorScheme="blue"><PeriodModal/></Box>
      </Box>
      <Box p={4} m={4} borderWidth="1px" borderRadius="lg" w="100%">
        <Table variant="striped" w="100%">
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Full Name</Th>
              <Th>Contact</Th>
              <Th textAlign="center">Enrollments Created</Th>
              <Th textAlign="center">Events Created</Th>
            </Tr>
          </Thead>
          {isLoading && <Tbody>
            <Tr><Td colSpan={5} textAlign="center">Loading</Td></Tr>
          </Tbody>}
          {isSuccess &&
            <Tbody>
              {data.map((user: any) => {
                return <Tr key={user.userCredentials.username}>
                  <Td>{user.userCredentials.username}</Td>
                  <Td>{user.displayName}</Td>
                  <Td>{user.phoneNumber}</Td>
                  <Td textAlign="center">{user.enrollments}</Td>
                  <Td textAlign="center">{user.events}</Td>
                </Tr>
              })}
            </Tbody>
          }
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
          </Select>
        </Center>
      </Box>
      {isError && <Box>{error.message}</Box>}
    </Flex>
  );
};

export default EnrollmentsStat;
