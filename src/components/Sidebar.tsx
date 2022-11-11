import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { OperationCard } from "./OperationCard";

interface IOperation {
    id: string;
    place: string;
    open: boolean;
    streaming: boolean;
    createdAt: Date | string | null | undefined;
}

interface IProps {
    operations?: IOperation[]
}

export function Sidebar({ operations }: IProps) {
    const data = new Date()

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

            <Flex
                flexDirection="column"
                gap={8}
            >
                {operations && operations.map((op: IOperation) => (
                    <OperationCard
                        key={op.id}
                        place={op.place}
                        open={op.open}
                        streaming={op.streaming}
                        createdAt={data}
                    />
                ))
                }
            </Flex>
        </Flex>
    );
}