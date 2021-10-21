import { Box, Radio, RadioGroup, Stack } from '@chakra-ui/react'
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
