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
import { OrgUnit } from "./OrgUnit";

const { RangePicker } = DatePicker;

const Totals = () => {
  return (
    <Flex justifyItems="center" direction="column">
      <Heading as="h3" size="lg" p={4} color="gray" justifyContent="center">
        Totals by Period
      </Heading>
      <Box p={4} d="flex">
        <Box ml={50}>
          <RangePicker size="large" />
        </Box>
        <Box ml={50}>
          <Button colorScheme="blue">Submit</Button>
        </Box>
      </Box>
      <Box p={4} d="flex">
        <OrgUnit />
      </Box>
    </Flex>
  );
};

export default Totals;
