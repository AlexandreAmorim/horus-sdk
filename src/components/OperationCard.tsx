import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import { CheckCircle, Lock } from 'phosphor-react';
import React from 'react';
import { Link } from 'react-router-dom';

interface OpProps {
    key: string;
    place: string;
    open: boolean;
    streaming: boolean;
    start_operation: Date;
}

export function OperationCard(props: OpProps) {

    return (
        <Link to={`/`}>
            <Box as="span" color="gray.300">
                Data
            </Box>

            <Box
                border="1px"
                borderColor="gray.500"
                borderRadius={4}
                p={4}
                my={2}
                _hover={{
                    borderColor: "green.500"
                }}
            >
                <Flex alignItems='center' justifyContent="space-between">
                    {props.open ? (
                        <HStack color="blue.500">
                            <CheckCircle size={20} />
                            <Text
                                fontSize="sm"
                                color='blue.500'
                                fontWeight="medium"
                            >
                                Em andamento
                            </Text>

                        </HStack>
                    ) : (
                        <HStack color="orange.500">
                            <Lock size={20} />
                            <Text
                                fontSize="sm"
                                color='orange.500'
                                fontWeight="medium"
                            >
                                Fechado
                            </Text>
                        </HStack>
                    )}
                    {!props.streaming ? (
                        <HStack>
                            <Box
                                border="1px"
                                borderRadius={4}
                                borderColor="red.300"
                                py="-0.125"
                                px={2}
                            >
                                <Text
                                    fontSize="xs"
                                    color='red.500'
                                    fontWeight="medium"
                                >
                                    NÃO ENVIADO
                                </Text>
                            </Box>
                        </HStack>
                    ) : (
                        <HStack>
                            <Box
                                border="1px"
                                borderRadius={4}
                                borderColor="blue.300"
                                py="-0.125"
                                px={2}
                            >
                                <Text
                                    fontSize="xs"
                                    color='blue.500'
                                    fontWeight="medium"
                                >
                                    ENVIADO
                                </Text>
                            </Box>
                        </HStack>
                    )}
                </Flex>
                <Text mt={5} color="white" align="justify">
                    {props.place}
                </Text>
            </Box>
        </Link>
    )
}