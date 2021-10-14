import { Box, Select } from '@chakra-ui/react'
import React from 'react'
import PeriodModal from "./PeriodModal";
import { useHistory } from 'react-router-dom';
import OrgunitTree from './OrgunitTree';
import { Flex, HStack } from "@chakra-ui/react"

const WhoDidWhat = () => {
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
  )
}

export default WhoDidWhat
