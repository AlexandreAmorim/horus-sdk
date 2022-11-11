import { Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

interface IPros {
    title: string
    link: string
}

export function DashCard({ title, link }: IPros) {
    return (
        <Link to={`/${link}`}>
            <Flex
                border="1px"
                borderColor="gray.500"
                borderRadius={4}
                _hover={{
                    borderColor: "green.500"
                }}
                height='80px'
                bg='gray.700'
                alignItems="center"
                justifyContent="center"
            >

                <Text fontWeight="bold" fontSize="2xl">{title}</Text>
            </Flex>
        </Link>
    );
}