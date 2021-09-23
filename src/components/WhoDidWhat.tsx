import { Box, Select } from '@chakra-ui/react'
import React from 'react'

const WhoDidWhat = () => {
  return (
    <Box p={4} m={4}>
      <Select>
        <option value="tei">Tracked Entity Instance</option>
        <option value="enrollment">Enrollment</option>
        <option value="event">Event</option>
      </Select>
    </Box>
  )
}

export default WhoDidWhat
