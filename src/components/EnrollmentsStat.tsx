import React, { FC } from "react";
import { useHistory } from 'react-router-dom';  
import { useEnrollmentCount, useLoader } from "../Queries";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  TableCaption,
  Td,
  chakra,
} from "@chakra-ui/react";
import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Input, Box, Heading, Button, ButtonGroup } from "@chakra-ui/react";

const EnrollmentsStat = () => {
  const history = useHistory();
  return (
    <div>
      <Box m={6}>
        <Heading as="h2" size="xl" p={4} color="gray" justifyContent="center">
          Enrollments Per user
        </Heading>
        <Box p={4}>
          <Input placeholder="Search by User Name" w={500} />
        </Box>
        <Box bg="gray.50" p={4} m={4} borderWidth="1px" borderRadius="lg">
          <Table variant="simple">
            <TableCaption></TableCaption>
            <Thead>
              <Tr>
                <Th>User Name</Th>
                <Th>Number of Enrollments</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>inches</Td>
                <Td>millimetres (mm)</Td>
              </Tr>
              <Tr>
                <Td>feet</Td>
                <Td>centimetres (cm)</Td>
              </Tr>
              <Tr>
                <Td>yards</Td>
                <Td>metres (m)</Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
        <Button p={4} m={4} colorScheme="blue" onClick={() => { history.push('/details') }} size="lg">
          Search by Other Attributes
        </Button>
      </Box>
    </div>
  );
};

export default EnrollmentsStat;
