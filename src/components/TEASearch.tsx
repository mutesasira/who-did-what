import { Box, Button, FormControl, FormHelperText, FormLabel, Grid, Input, Select } from '@chakra-ui/react';
import { useStore } from 'effector-react';
import React, { ChangeEvent, useState } from 'react';
import { changeAttribute } from '../Events';
import { useTEA } from '../Queries';
import { $attributes, $store } from '../Store';

const TEASearch = () => {
  const store = useStore($store);
  const [value, setValue] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const attributes = useStore($attributes);
  const { isLoading, isError, isSuccess, data, error } = useTEA(store.program.id, store.attribute, value);

  const find = () => {
    if (search) {
      setValue(search)
    }
  }

  return (
    <>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <FormControl id="attribute">
          <FormLabel>Tracked Entity Attribute</FormLabel>
          <Select placeholder="Select tracked entity attribute" value={store.attribute} onChange={(e: ChangeEvent<HTMLSelectElement>) => changeAttribute(e.target.value)}>
            {attributes.map((item: any) => <option value={item.id} key={item.id}>{item.name}</option>)}
          </Select>
        </FormControl>
        <FormControl id="teiText">
          <FormLabel>Attribute Value</FormLabel>
          <Input value={search} onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} />
          <FormHelperText>Enter Attribute Value</FormHelperText>
        </FormControl>
        <FormControl id="button" m={8}>
          <Button colorScheme="blue" onClick={() => find()}>Search</Button>
        </FormControl>
      </Grid>
      <Box>
        {isLoading && <div>Loading</div>}
        {isSuccess && <div><pre>{JSON.stringify(data, null, 2)}</pre></div>}
        {isError && <div>{error.message}</div>}
      </Box>
    </>
  )
}

export default TEASearch
