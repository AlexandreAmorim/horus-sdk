import { Flex, Box, Spinner, VStack } from '@chakra-ui/react';
import React from 'react';

interface IPropsLoading {
    message: string
}

export function LoadingView({ message }: IPropsLoading) {

    return (
        <Flex
            h="100vh"
            p={4}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            bg="gray.200"
        >
            <VStack
                border="1px"
                borderColor="gray.400"
                borderRadius={8}
                justifyContent="center"
                p={4}
                h={28}
                bg="gray.100"
            >
                <Box>{message}</Box>
                <Spinner size='md' />
            </VStack>
        </Flex>
    );
}