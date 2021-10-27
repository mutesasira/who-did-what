import React from 'react';
import {Box} from '@chakra-ui/react';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';


const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const EnrollmentDatesearch = () => {
  return (
    <>
      <Box ml={50} colorScheme="blue">
        <DatePicker size="large"  defaultValue={moment('01/01/2015', dateFormatList[0])} format={dateFormatList} />
      </Box>
    </>
  )
}

export default EnrollmentDatesearch
