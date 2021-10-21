import {
  FormControl,
  FormLabel,
  Select,
  Stack,
  Text
} from '@chakra-ui/react';
import { useStore } from 'effector-react';
import React from 'react';
import { changeTrackedEntityType } from '../Events';
import { Item } from '../interfaces';
import { $store, $trackedEntityTypePrograms } from '../Store';
const TrackerSearch = () => {
  const store = useStore($store);
  const trackedEntityTypePrograms = useStore($trackedEntityTypePrograms);
  return (
    <Stack spacing="10px">
      <Stack direction="row">
        <FormControl id="email">
          <FormLabel>Tracked Entity Type</FormLabel>
          <Select placeholder="Select tracked entity type" value={store.trackedEntityType} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => changeTrackedEntityType(e.target.value)}>
            {store.trackedEntityTypes.map((item: Item) => <option value={item.id} key={item.id}>{item.name}</option>)}
          </Select>
        </FormControl>
        <Text>Woking</Text>
      </Stack>
      <FormControl id="email">
        <FormLabel>Program</FormLabel>
        <Select placeholder="Select option">
          {trackedEntityTypePrograms.map((item: Item) => <option value={item.id} key={item.id}>{item.name}</option>)}
        </Select>
      </FormControl>
    </Stack>
  )
}

export default TrackerSearch
