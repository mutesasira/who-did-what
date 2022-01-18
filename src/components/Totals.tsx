import React, { useState } from "react";
import {
  Box,
  Center,
  Flex,
  Heading,
  Input,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Button,
  ButtonGroup,
  Spinner,
} from "@chakra-ui/react";
import { DatePicker } from "antd";
import "antd/dist/antd.css";
import { ChangeEvent } from "react";
import {
  Pagination,
  PaginationContainer,
  PaginationNext,
  PaginationPage,
  PaginationPageGroup,
  PaginationPrevious,
  PaginationSeparator,
  usePagination,
} from "@ajna/pagination";
import { OrgUnit } from "./OrgUnit";
import { useEnrollmentOUCount } from "../Queries";
import { useStore } from "effector-react";
import { $store } from "../Store";
import moment from "moment";

const { RangePicker } = DatePicker;

const OUTER_LIMIT = 4;
const INNER_LIMIT = 4;

const Totals = () => {
  const store = useStore($store);
  const [date, setDate] = useState<[any, any]>([moment(), moment()]);
  const {
    pages,
    pagesCount,
    offset,
    currentPage,
    setCurrentPage,
    isDisabled,
    pageSize,
    setPageSize,
  } = usePagination({
    total: store.total,
    limits: {
      outer: OUTER_LIMIT,
      inner: INNER_LIMIT,
    },
    initialState: {
      pageSize: 10,
      currentPage: 1,
    },
  });

  const handlePageChange = (nextPage: number): void => {
    setCurrentPage(nextPage);
  };

  const handlePageSizeChange = (
    event: ChangeEvent<HTMLSelectElement>
  ): void => {
    const pageSize = Number(event.target.value);
    setPageSize(pageSize);
    setCurrentPage(1);
  };

  const { isLoading, isSuccess, isError, data, error } = useEnrollmentOUCount(
    currentPage,
    pageSize,
    date[0].format("YYYY-MM-DD"),
    date[1].format("YYYY-MM-DD")
  );
  return (
    <Flex justifyItems="center" direction="column">
      {isLoading && <Spinner />}
      {isSuccess && <pre>{JSON.stringify(data, null, 2)}</pre>}
      {isError && <div>{error.message}</div>}
    </Flex>
  );
};

export default Totals;
