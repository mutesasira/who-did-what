import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Grid, Select, Button
} from '@chakra-ui/react';
import { Item } from '../interfaces';
import { $store } from '../Store';
import { useStore } from 'effector-react';
import { changeDataElement } from '../Events';

const DataElementSearch = () => {
  const store = useStore($store);
  return (
    <>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <FormControl id="attribute">
          <FormLabel>Data Element</FormLabel>
          {/* <Select placeholder="Select Data Element" value={store.dataElement} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => changeDataElement(e.target.value)}>
            {store.dataElements.map((item: Item) => <option value={item.id} key={item.id}>{item.name}</option>)}
          </Select> */}
        </FormControl>
        <FormControl id="teiText">
          <FormLabel>Data Element Value</FormLabel>
          <Input />
          <FormHelperText>Enter Data Element Value</FormHelperText>
        </FormControl>
        <FormControl id="button" m={8}>
          <Button colorScheme="blue">Search</Button>
        </FormControl>
      </Grid>
    </>
  )
}

export default DataElementSearch
