import { Box, Text, Flex, Button } from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../contexts/auth";
import { OperationCard } from "./OperationCard";

export function Sidebar() {
    const { signOut } = useAuth()

    const data = new Date()

    function handleSignOut() {
        signOut()
    }

    return (
        <Flex
            as="aside"
            w="348px"
            bgColor="gray.700"
            p="6"
            borderLeft="1px"
            borderColor="gray.600"
            flexDirection="column"
        >
            <Box
                as="span"
                fontWeight="bold"
                fontSize="2xl"
                pb={6}
                mb={6}
                borderBottom="1px"
                borderColor="gray.500"
            >
                Operações recentes
            </Box>

            <Flex flexDirection="column" gap={8}>
                <OperationCard title="0.01.06 - Av. Mem de Sá esquina com Rua do Senado + volante na Rua Tenente Possolo, Centro, RJ." availableAt={data} />
            </Flex>

            <Box>
                <Button
                    onClick={handleSignOut}
                    textAlign="center"
                    bg="gray.600"
                >
                    <Text fontSize="sm" fontWeight="bold">Sair</Text>
                </Button>
            </Box>
        </Flex>
    );
}