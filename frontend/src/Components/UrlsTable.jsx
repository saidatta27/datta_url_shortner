import { Pagination, Table, Text, Container, Stack } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import Service from '../utils/http';

const s = new Service();

export default function UrlsTable() {
    const [activePage, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const getData = async (pno, limit) => {
        try {
            setLoading(true);
            let response = await s.get(`user/my/urls?page=${pno}&limit=${limit}`);
            console.log("Full Response:", response);

            setData(response?.shortURLs ||[]);
            setTotalPages(response?.totalPages);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData(activePage, 10);
    }, [activePage]);

    const rows = data.length > 0 ? data.map((element, index) => (
        <>
        <Table.Tr key={element._id}>
            <Table.Td>{(activePage - 1) * 10 + index + 1}</Table.Td>
            <Table.Td>
                {element.originalUrl}
            </Table.Td>

            <Table.Td>
                <a href={"https://url-shortener-bootcamp.onrender.com/api/s/${element.shortCode}"} target="_blank" rel="noopener noreferrer">
                    {element.shortCode}
                </a>
            </Table.Td>
            <Table.Td>{element.clickCount}</Table.Td>
            <Table.Td>{new Date(element.expiresAt).toLocaleString()}</Table.Td>
        </Table.Tr>
        </>
    )) : (
        <Table.Tr>
            <Table.Td colSpan={4}>
                <Text align="center">No URLs found</Text>
            </Table.Td>
        </Table.Tr>
    );

    return (
        <Container>
            <Stack>
                <Table withBorder>
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>ID</Table.Th>
                            <Table.Th>Original Url</Table.Th>
                            <Table.Th>Short Url</Table.Th>
                            <Table.Th>Clicks</Table.Th>
                            <Table.Th>Expires At</Table.Th>
                        </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                        {loading ? (
                            <Table.Tr>
                                <Table.Td colSpan={4}>
                                    <Text align="center">Loading...</Text>
                                </Table.Td>
                            </Table.Tr>
                        ) : (
                            rows
                        )}
                    </Table.Tbody>
                </Table>
                <Pagination value={activePage} onChange={setPage} total={totalPages} positionPagination="bottom" />
            </Stack>
        </Container>
    );
}