import {
  FormControl,
  FormLabel,
  Select,
  Stack,
  Grid, Radio, RadioGroup,
} from '@chakra-ui/react';
import { useStore } from 'effector-react';
import React, { ChangeEvent } from 'react';
import { changeTrackedEntityType } from '../Events';
import { Item, Program } from '../interfaces';
import { $store, $trackerPrograms } from '../Store';
import { useState } from 'react'
import TEISearch from './TEISearch';
import TEASearch from './TEASearch';
import EventInProgramSearch from './EventInProgramSearch';
import EnrollmentDatesearch from './EnrollmentDatesearch';
import { useProgram } from '../Queries';

const TrackerSearch = () => {
  const store = useStore($store);
  const [currentProgram, setCurrentProgram] = useState<string>('yDuAzyqYABS')
  const trackerPrograms = useStore($trackerPrograms);
  const [searched, setSearched] = useState<string>('');

  const allSearches = {
    tei: <TEISearch />,
    tea: <TEASearch />,
    event: <EventInProgramSearch />,
    enrollmentDate: <EnrollmentDatesearch />,
  }
  const { error, isError, isLoading, isSuccess } = useProgram(currentProgram);
  return (
    <Stack spacing="10px" pl={4}>
      <FormControl>
        <FormLabel>Program</FormLabel>
        <Select placeholder="Select option" onChange={(e: ChangeEvent<HTMLSelectElement>) => setCurrentProgram(e.target.value)} >
          {trackerPrograms.map((item: Program) => <option value={item.id} key={item.id}>{item.name}</option>)}
        </Select>
      </FormControl>
      {isLoading && <div>Loading</div>}
      {isSuccess && <Stack>

        <RadioGroup value={searched} onChange={setSearched}>
          <Grid templateColumns="repeat(5, 1fr)" gap={6}>
            <Radio value="tei" m={10}>Tracked Entity Instance</Radio>
            <Radio value="tea">Tracked Entity Attribute</Radio>
            <Radio value="event">Event in a Program</Radio>
            <Radio value="enrollmentDate">Enrollment Date</Radio>
          </Grid>
        </RadioGroup>

        {allSearches[searched]}

      </Stack>
      }
      {isError && <div>{error.message}</div>}

    </Stack>
  )
}

export default TrackerSearch
