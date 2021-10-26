import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText
} from '@chakra-ui/react';

const TEISearch = () => {
  return (
    <>
      <FormControl id="teiText">
        <FormLabel>Tracked Entity Instance ID</FormLabel>
        <Input/>
        <FormHelperText>Search by Tracked Entity Instance ID</FormHelperText>
      </FormControl>
    </>
  )
}

export default TEISearch
