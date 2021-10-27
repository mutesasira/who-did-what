import {
  FormControl,
  FormLabel, Grid, Radio, RadioGroup, Select
} from '@chakra-ui/react';
import { useStore } from 'effector-react';
import React, { ChangeEvent, useState } from 'react';
import { changeStage } from '../Events';
import { $stages, $store } from '../Store';
import DataElementSearch from './DataElementSearch';
import EventIDSearch from './EventIDSearch';

const EventInProgramSearch = () => {
  const store = useStore($store);
  const stages = useStore($stages)
  const [searched, setSearched] = useState<string>('');

  const allSearches = {
    event: <EventIDSearch />,
    dataelement: <DataElementSearch />
  }

  return (
    <>
      <FormControl >
        <FormLabel>Program Stage</FormLabel>
        <Select placeholder="Select option" value={store.stage} onChange={(e: ChangeEvent<HTMLSelectElement>) => changeStage(e.target.value)}>
          {stages.map((item: any) => <option value={item.id} key={item.id}>{item.name}</option>)}
        </Select>
      </FormControl>
      <RadioGroup value={searched} onChange={setSearched}>
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          <Radio value="event" m={10}>Event</Radio>
          <Radio value="dataelement">Data Element</Radio>
        </Grid>
      </RadioGroup>
      {allSearches[searched]}
    </>
  )
}

export default EventInProgramSearch
