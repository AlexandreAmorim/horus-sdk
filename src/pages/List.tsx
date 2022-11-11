import { Center, Flex, Table, Tbody, Td, Tr } from "@chakra-ui/react";
import { CaretCircleDoubleRight, MinusCircle } from "phosphor-react";
import React, { useCallback, useEffect, useState } from "react";
import { Header } from "../components/Header";
import { useAuth } from "../contexts/auth";

export function List() {
    const { user } = useAuth()
    const [operations, setOperations] = useState<any[]>([]);
    const init = useCallback(async () => {
        const data = await window.Main.listOperations(user)
        console.log(data)
        setOperations(data)
    }, [])

    console.log("HH ", operations)

    useEffect(() => {
        init()
    }, []);

    return (
        <Flex flexDirection="column" alignItems="center">
            <Header />
            <Center py={8}>
                <Table size='sm' variant="unstyled" bg="gray.700">
                    <Tbody>
                        {
                            operations.map((c: any) => (
                                <Tr
                                    border="1px"
                                    borderColor="gray.500"
                                    borderTopRadius="3xl"
                                    key={c.id}
                                >
                                    <Td>{c.team}</Td>
                                    <Td>{c.place}</Td>
                                    <Td>{c.district}</Td>
                                    <Td>{c.open ?
                                        <CaretCircleDoubleRight size={20} color="#26a269" />
                                        :
                                        <MinusCircle size={20} color="#c01c28" />
                                    }
                                    </Td>
                                </Tr>
                            ))
                        }
                    </Tbody>
                </Table>
            </Center>
        </Flex >
    );
}
