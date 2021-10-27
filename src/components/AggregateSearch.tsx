import {
  FormControl,
  FormLabel,
  Select,
  Grid
} from '@chakra-ui/react';
import React from 'react';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';


const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const AggregateSearch = () => {
  return (
    <>
      <Grid templateColumns="repeat(4, 1fr)" gap={6} w="full" m={8}>
        <FormControl >
          <FormLabel>Data Set</FormLabel>
          <Select placeholder="Select Data Set">
          </Select>
        </FormControl>
        <FormControl >
          <FormLabel>Organisation Unit</FormLabel>
          <Select placeholder="Select Organisation Unit">
          </Select>
        </FormControl>
        <FormControl >
          <FormLabel>Data Elements</FormLabel>
          <Select placeholder="Select Data Element">
          </Select>
        </FormControl>
        <FormControl >
          <FormLabel>Period</FormLabel>
          <DatePicker size="large"  defaultValue={moment('01/01/2015', dateFormatList[0])} format={dateFormatList} />
        </FormControl>
      </Grid>
    </>
  )
}

export default AggregateSearch
