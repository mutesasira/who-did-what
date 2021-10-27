import React from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Grid, Select
} from '@chakra-ui/react';

const EventIDSearch = () => {
  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        <FormControl id="teiText">
          <FormLabel>Event ID</FormLabel>
          <Input />
          <FormHelperText>Search Using Event ID</FormHelperText>
        </FormControl>
      </Grid>
    </>
  )
}

export default EventIDSearch
