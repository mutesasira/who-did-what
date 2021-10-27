import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  RadioGroup, Radio,
  FormHelperText,
  Grid, Select
} from '@chakra-ui/react';
import { useStore } from 'effector-react';
import { Item } from '../interfaces';
import { $store, $trackedEntityTypePrograms, $programStage } from '../Store';
import EventIDSearch from './EventIDSearch';
import DataElementSearch from './DataElementSearch';

const EventInProgramSearch = () => {
  const store = useStore($store);
  const programStage = useStore($programStage);
  const trackedEntityTypePrograms = useStore($trackedEntityTypePrograms);

  const [searched, setSearched] = useState<string>('');

  const allSearches = {
    event: <EventIDSearch />,
    dataelement: <DataElementSearch />
  }

  return (
    <>
      <RadioGroup value={searched} onChange={setSearched}>
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        <FormControl >
          <FormLabel>Program Stage</FormLabel>
          <Select placeholder="Select program stage">
            {programStage.map((item: Item) => <option value={item.id} key={item.id}>{item.name}</option>)}
          </Select>
        </FormControl>
          <Radio value="event" m={10}>Event</Radio>
          <Radio value="dataelement">Data Element</Radio>
        </Grid>
      </RadioGroup>
      {allSearches[searched]}
    </>
  )
}

export default EventInProgramSearch
