import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { useAuth } from "../contexts/auth";
import { OperationCard } from "./OperationCard";

interface IOperation {
    id: string;
    place: string;
    open: boolean;
    streaming: boolean;
    createdAt: Date;
}

interface IProps {
    operations?: IOperation[]
}

export function Sidebar({ operations }: IProps) {
    const { signOut } = useAuth()

    const data = new Date()

    async function handleSignOut() {
        await signOut()
    }

    console.log("JKJKJ ", operations)

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
                {operations && operations.map((op: IOperation) => (
                    <OperationCard
                        key={op.id}
                        place={op.place}
                        open={op.open}
                        streaming={op.streaming}
                        availableAt={data}
                    />
                ))
                }

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