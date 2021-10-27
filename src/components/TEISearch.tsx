import { useState, ChangeEvent } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  FormHelperText,
  Box
} from '@chakra-ui/react';
import { useTEI } from '../Queries';
import { useStore } from 'effector-react';
import { $store } from '../Store';

const TEISearch = () => {
  const store = useStore($store)
  const [value, setValue] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const { isLoading, isError, isSuccess, data, error } = useTEI(store.program.id, value);

  const find = () => {
    if (search) {
      setValue(search)
    }
  }

  return (
    <>
      <FormControl id="teiText">
        <FormLabel>Tracked Entity Instance ID</FormLabel>
        <Input value={search} onChange={(e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} />
        <FormHelperText>Search by Tracked Entity Instance ID</FormHelperText>
      </FormControl>
      <FormControl id="button" m={8}>
        <Button colorScheme="blue" onClick={() => find()}>Search</Button>
      </FormControl>

      <Box>
        {isLoading && <div>Loading</div>}
        {isSuccess && <div><pre>{JSON.stringify(data, null, 2)}</pre></div>}
        {isError && <div>{error.message}</div>}
      </Box>
    </>
  )
}

export default TEISearch
