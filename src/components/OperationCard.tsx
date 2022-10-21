import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import { Link } from 'react-router-dom';
import React from 'react';
import { Box, Flex, HStack, Text } from '@chakra-ui/react';

interface LessonProps {
    title: string;
    availableAt: Date;
}

export function OperationCard(props: LessonProps) {

    const isAvailable = isPast(props.availableAt)
    const availableDateFormatted = format(props.availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm", {
        locale: ptBR,
    })

    return (
        <Link to={`/`}>
            <Box as="span" color="gray.300">
                {availableDateFormatted}
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
                    {isAvailable ? (
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
                </Flex>
                <Text mt={5} color="white" align="justify">
                    {props.title}
                </Text>
            </Box>
        </Link>
    )
}