import { usePagination } from "@ajna/pagination";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Spacer,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { useDataEngine } from "@dhis2/app-runtime";
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import { useStore } from "effector-react";
import moment from "moment";
import { ChangeEvent, useState } from "react";
import * as XLSX from "xlsx";
import { useEs } from "../Queries";
import { $store } from "../Store";
import PaginatedTable from "./PaginatedTable";

const { RangePicker } = DatePicker;

const EventsStat = () => {
  const [date, setDate] = useState<[any, any]>([moment(), moment()]);
  const [downloading, setDownloading] = useState<boolean>(false);
  
  const [selectedDate, setSelectedDate] = useState<[string, string]>([
    null,
    null,
  ]);
  const [query, setQuery] = useState<string>("");
  const [q, setQ] = useState<string>("");
  const store = useStore($store);

  const changeSearch = () => {
    setQuery(q);
    setSelectedDate([
      date[0].format("YYYY-MM-DD"),
      date[1].format("YYYY-MM-DD"),
    ]);
  };
  const { isError, isLoading, isSuccess, error, data } = useEs(
    query,
    selectedDate[0],
    selectedDate[1],
    store.organisationUnits.map((o: any) => String(o.id).toLowerCase())
  );

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
    setQuery(q);
    setSelectedDate([
      date[0].format("YYYY-MM-DD"),
      date[1].format("YYYY-MM-DD"),
    ]);
    setDownloading(true);

    const all = [
      [
        "Username",
        "Full Name",
        "Phone Contact",
        "Events Created",
        "Events Completed",
      ],
      ...data.summary.buckets.map((r: any) => {
        return [
          r.key,
          store.users[r.key]?.displayName,
          store.users[r.key]?.phoneNumber,
          r.doc_count,
          findCompleted(r),
        ];
      }),
    ];
    const sheetName = "Events";
    const filename = `Events-${store.organisationUnits
      .map((o: any) => o.name)
      .join("-")}-${selectedDate[0]}-${selectedDate[1]}.xlsx`;
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(all);
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, filename);
    setDownloading(false);
  };
  return (
    <Flex justifyItems="center" direction="column">
      <Heading as="h3" size="lg" p={4} color="gray" justifyContent="center">
        Summary Statistics
      </Heading>
      <Stack p={4} direction="row" spacing={50}>
        <Input
          placeholder="Search by User Name"
          w={500}
          value={q}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setQ(e.target.value)}
        />
        <RangePicker size="large" value={date} onChange={setDate} />

        <Button colorScheme="blue" onClick={changeSearch} isLoading={isLoading}>
          Submit
        </Button>
        <Spacer />
        <Button
          colorScheme="blue"
          onClick={downloadEvents}
          isLoading={downloading}
          isDisabled={data?.summary.buckets.length === 0}
        >
          Download
        </Button>
      </Stack>
      <Box p={4} m={4} borderWidth="1px" borderRadius="lg">
        {isLoading && <Spinner />}
        {isSuccess && <PaginatedTable data={data} />}
      </Box>
      {isError && <Box>{error.message}</Box>}
    </Flex>
  );
};

export default EventsStat;
