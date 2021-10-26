import {
  FormControl,
  FormLabel,
  Select,
  Stack,
  Grid, Radio, RadioGroup,
} from '@chakra-ui/react';
import { useStore } from 'effector-react';
import React from 'react';
import { changeTrackedEntityType } from '../Events';
import { Item } from '../interfaces';
import { $store, $trackedEntityTypePrograms, $programStage } from '../Store';
import { useState } from 'react'
import TEISearch from './TEISearch';
import TEASearch from './TEASearch';
import EventInProgramSearch from './EventInProgramSearch';
import EnrollmentDatesearch from './EnrollmentDatesearch';


const TrackerSearch = () => {
  const store = useStore($store);
  const trackedEntityTypePrograms = useStore($trackedEntityTypePrograms);
  const [searched, setSearched] = useState<string>('');

  const allSearches = {
    tei: <TEISearch />,
    tea: <TEASearch />,
    event: <EventInProgramSearch />,
    enrollmentDate: <EnrollmentDatesearch />,
  }

  return (
    <Stack spacing="10px" pl={4}>
      <Grid templateColumns="repeat(1, 1fr)" gap={6}>
        <FormControl id="email">
          <FormLabel>Tracked Entity Type</FormLabel>
          <Select placeholder="Select tracked entity type" value={store.trackedEntityType} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => changeTrackedEntityType(e.target.value)}>
            {store.trackedEntityTypes.map((item: Item) => <option value={item.id} key={item.id}>{item.name}</option>)}
          </Select>
        </FormControl>
        {/* <FormControl >
          <FormLabel>Program Stage</FormLabel>
          <Select placeholder="Select program stage">
            {programStage.map((item: Item) => <option value={item.id} key={item.id}>{item.name}</option>)}
          </Select>
        </FormControl> */}
      </Grid>
      <RadioGroup value={searched} onChange={setSearched}>
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          <FormControl>
            <FormLabel>Program</FormLabel>
            <Select placeholder="Select option" >
              {trackedEntityTypePrograms.map((item: Item) => <option value={item.id} key={item.id}>{item.name}</option>)}
            </Select>
          </FormControl>
          <Radio value="tei" m={10}>Tracked Entity Instance</Radio>
          <Radio value="tea">Tracked Entity Attribute</Radio>
          <Radio value="event">Event in a Program</Radio>
          <Radio value="enrollmentDate">Enrollment Date</Radio>
        </Grid>
      </RadioGroup>
      {allSearches[searched]}
    </Stack>
  )
}

export default TrackerSearch
