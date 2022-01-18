import {
    Table, TableCaption, Tbody, Td, Th, Thead, Tr
} from "@chakra-ui/react";
import { isArray } from "lodash";
import React from "react";
import { useDistrict } from "../Queries";

export const OrgUnit = () => {
    const { data, isLoading, isSuccess, isError, error } = useDistrict();

    return (
        <Table variant="simple">
            <TableCaption>Districts</TableCaption>
            <Thead>
                <Tr>
                    <Th>District Name</Th>
                    <Th textAlign="center">Total Enrollments Created</Th>
                    <Th textAlign="center">Total Events Created</Th>
                    <Th textAlign="center">Total Events Completed</Th>
                </Tr>
            </Thead>
            {isLoading && (
                <Tbody>
                    <Tr>
                        <Td colSpan={2} textAlign="center">
                            Its Loading
                        </Td>
                    </Tr>
                </Tbody>
            )}
            {isSuccess && (
                <Tbody>
                    {data.map((district: any) => {
                        return (
                            <Tr key={district.displayName}>
                                <Td>{district.displayName}</Td>
                                <Td>{}</Td>
                                <Td>{}</Td>
                                <Td>{}</Td>
                            </Tr>
                        );
                    })}
                </Tbody>
            )}
        </Table>
        // <><pre>{JSON.stringify(data, null, 2)}</pre></>
    );
};
