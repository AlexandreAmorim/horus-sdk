import { Box, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React from 'react';

interface IPros {
    title: string
    link: string
}

export function DashCard({ title, link }: IPros) {
    return (
        <Link to={`/${link}`}>
            <Box border="1px"
                borderColor="gray.500"
                borderRadius={4}
                p={4}
                my={2}
                _hover={{
                    borderColor: "green.500"
                }} height='80px' bg='gray.700'>

                <Text fontWeight="bold" fontSize="2xl">{title}</Text>
            </Box>
        </Link>
    );
}