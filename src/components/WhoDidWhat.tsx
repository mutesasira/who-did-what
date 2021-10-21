import { Box, Select } from '@chakra-ui/react'
import React from 'react'
import PeriodModal from "./PeriodModal";
import { useHistory } from 'react-router-dom';
import OrgunitTree from './OrgunitTree';
import { Box, Radio, RadioGroup, Stack, Flex, HStack } from '@chakra-ui/react'
import { useState } from 'react'
import AggregateSearch from './AggregateSearch'
import EventSearch from './EventSearch'
import TrackerSearch from './TrackerSearch'

const WhoDidWhat = () => {
  const [searchType, setSearchType] = useState<string>('tracker');

  const allSearches = {
    tracker: <TrackerSearch />,
    event: <EventSearch />,
    aggregate: <AggregateSearch />
  }

  return (
    <Flex>
      <Box p={2} m={2}>

        <HStack spacing="100px">
          <PeriodModal />
          <OrgunitTree />
        </HStack>
        <Box mt={4}>
          <Select>
            <option value="tei">Tracked Entity Instance</option>
            <option value="enrollment">Enrollment</option>
            <option value="event">Event</option>
          </Select>
        </Box>
      </Box>
    </Flex>
    <Box p={4} m={4}>
      <RadioGroup value={searchType} onChange={setSearchType}>
        <Stack direction="row">
          <Radio value="tracker">Tracker Program</Radio>
          <Radio value="event">Event Program</Radio>
          <Radio value="aggregate">Aggregate</Radio>
        </Stack>
      </RadioGroup>
      {allSearches[searchType]}
    </Box>
  )
}

export default WhoDidWhat
