import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Grid, Select, Button, ButtonGroup, Box, Table, Tbody, Td, Text, Th, Thead, Tr,
} from '@chakra-ui/react';
import { Item } from '../interfaces';
import { $store } from '../Store';
import { useStore } from 'effector-react';
import { changeTrackedEntityAttributes } from '../Events';

const TEASearch = () => {
  const store = useStore($store);
  return (
    <>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <FormControl id="attribute">
          <FormLabel>Tracked Entity Attribute</FormLabel>
          {/* <Select placeholder="Select tracked entity attribute" value={store.trackedEntityAttribute} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => changeTrackedEntityAttributes(e.target.value)}>
            {store.trackedEntityAttributes.map((item: Item) => <option value={item.id} key={item.id}>{item.name}</option>)}
          </Select> */}
        </FormControl>
        <FormControl id="teiText">
          <FormLabel>Attribute Value</FormLabel>
          <Input />
          <FormHelperText>Enter Attribute Value</FormHelperText>
        </FormControl>
        <FormControl id="button" m={8}>
          <Button colorScheme="blue">Search</Button>
        </FormControl>
      </Grid>
      <Box>
      <Table variant="striped" w="100%">
          <Thead>
            <Tr>
              <Th>Username</Th>
              <Th>Full Name</Th>
              <Th>Contact</Th>
              <Th textAlign="center">Last Updated By</Th>
              <Th textAlign="center">Created By</Th>
              <Th textAlign="center">Stored By</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr><Td colSpan={5} textAlign="center">Loading</Td></Tr>
          </Tbody>
          {
            <Tbody>
              
                return <Tr >
                  <Td>{}</Td>
                  <Td>{}</Td>
                  <Td>{}</Td>
                <Td textAlign="center">{ }</Td>
                  <Td textAlign="center">{}</Td>
                </Tr>
            </Tbody>
          }
        </Table>
      </Box>
    </>
  )
}

export default TEASearch
