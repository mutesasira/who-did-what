import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

import EnrollmentStat from "./EnrollmentsStat";
import EventsStat from "./EventsStat";
const Statistics = () => {
  return (
    <Tabs>
      <TabList>
        <Tab>Events</Tab>
        <Tab>Enrollments</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <EventsStat />
        </TabPanel>
        <TabPanel>
          <EnrollmentStat />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default Statistics;
