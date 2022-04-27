import {
  Box,
  Button,
  Flex,
  Heading,
  Spacer,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Input,
} from "@chakra-ui/react";
import * as XLSX from "xlsx";
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import { useStore } from "effector-react";
import moment from "moment";
import { ChangeEvent, useState } from "react";
import { useDistricts } from "../Queries";
import { $store } from "../Store";

const { RangePicker } = DatePicker;

const Totals = () => {
  const store = useStore($store);
  const [date, setDate] = useState<[any, any]>([moment(), moment()]);
  const [q, setQ] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [downloading, setDownloading] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<[string, string]>([
    null,
    null,
  ]);

  const { isLoading, isSuccess, isError, data, error } = useDistricts(
    store.organisationUnits.map((o: any) => String(o.id).toLowerCase()),
    selectedDate[0],
    selectedDate[1],
    username
  );

  const changeSearch = () => {
    setSelectedDate([
      date[0].format("YYYY-MM-DD"),
      date[1].format("YYYY-MM-DD"),
    ]);
    setUsername(q);
  };
  const findCompleted = (row: any) => {
    const found = row.status.buckets.find(
      (bucket: any) => bucket.key === "COMPLETED"
    );
    if (found) {
      return found.doc_count;
    }
    return 0;
  };

  const downloadEvents = async () => {
    setDownloading(true);

    const all = [
      ["UID", "District Name", "Events Created", "Events Completed"],
      ...data.summary.buckets.map((r: any) => {
        return [r.key, store.districts[r.key], r.doc_count, findCompleted(r)];
      }),
    ];
    const sheetName = "Summary";
    const filename = `Summary-${selectedDate[0]}-${selectedDate[1]}.xlsx`;
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(all);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, filename);
    setDownloading(false);
  };
  return (
    <Flex justifyItems="center" direction="column">
      <Heading as="h3" size="lg" p={4} color="gray" justifyContent="center">
        Total Statistics
      </Heading>
      <Stack direction="row" p={4} spacing={50}>
        <Input
          placeholder="Search by User Name"
          w={500}
          value={q}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQ(e.target.value)}
        />
        <RangePicker size="large" value={date} onChange={setDate} />
        <Button colorScheme="blue" onClick={changeSearch}>
          Submit
        </Button>
        <Spacer />
        <Button
          colorScheme="blue"
          onClick={downloadEvents}
          isLoading={downloading}
        >
          Download
        </Button>
      </Stack>
      <Box overflow="auto" h="calc(100vh - 270px)">
        <Table variant="striped" w="100%">
          <Thead>
            <Tr>
              <Th>UID</Th>
              <Th>District Name</Th>
              <Th textAlign="center">Events Created</Th>
              <Th textAlign="center">Events Completed</Th>
            </Tr>
          </Thead>
          {isLoading && (
            <Tbody>
              <Tr>
                <Td colSpan={5} textAlign="center">
                  Loading
                </Td>
              </Tr>
            </Tbody>
          )}
          {isSuccess && (
            <Tbody>
              {data.summary.buckets.map((bucket: any) => {
                return (
                  <Tr key={bucket.key}>
                    <Td>{bucket.key}</Td>
                    <Td>{store.districts[bucket.key]}</Td>
                    <Td textAlign="center">{bucket.doc_count}</Td>
                    <Td textAlign="center">{findCompleted(bucket)}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          )}
        </Table>
      </Box>
      {isError && <div>{error.message}</div>}
    </Flex>
  );
};

export default Totals;
