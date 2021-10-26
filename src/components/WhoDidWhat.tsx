import { Box, Radio, RadioGroup, Stack, Flex, HStack, Select } from '@chakra-ui/react'
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
        <RadioGroup value={searchType} onChange={setSearchType}>
          <Stack direction="row" m={4}   >
            <Radio value="tracker" fontSize="35px" >Tracker Program</Radio>
            <Radio value="event">Event Program</Radio>
            <Radio value="aggregate">Aggregate</Radio>
          </Stack>
        </RadioGroup>
        {allSearches[searchType]}
      </Box>
    </Flex>
  )
}

export default WhoDidWhat
