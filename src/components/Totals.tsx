import React from "react";
import {
  Box,
  Center,
  Flex,
  Heading,
  Input,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { DatePicker } from "antd";
import "antd/dist/antd.css";

const { RangePicker } = DatePicker;

const Totals = () => {
  return (
      
    <Flex justifyItems="center" direction="column">
      <Heading as="h3" size="lg" p={4} color="gray" justifyContent="center">
        Totals by Period
      </Heading>
      <Box p={4} d="flex">
        <Input placeholder="Search by Organization Unit" w={500} />
        <Box ml={50}>
          <RangePicker size="large" />
        </Box>
        <Box ml={50}>
          <Button colorScheme="blue">Submit</Button>
        </Box>
      </Box>
      <Box p={4} m={4} borderWidth="1px" borderRadius="lg">
        <Table variant="striped" w="100%">
          <Thead>
            <Tr>
              <Th textAlign="center">Organization Unit</Th>
              <Th textAlign="center">Total Enrollments Created</Th>
              <Th textAlign="center">Total Events Created</Th>
              <Th textAlign="center">Total Events Completed</Th>
            </Tr>
          </Thead>
          {/* <Tbody>
            <Tr>
              <Td colSpan={6} textAlign="center">
                Loading
              </Td>
            </Tr>
          </Tbody> */}
          <Tbody>
            <Tr>
              <Td textAlign="center">1</Td>
              <Td textAlign="center">2</Td>
              <Td textAlign="center">3</Td>
              <Td textAlign="center">4</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </Flex>
  );
};

export default Totals;
