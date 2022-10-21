import React from "react";
import { Header } from "../components/Header";
import { Box, Flex, SimpleGrid } from "@chakra-ui/react";
import { DashCard } from "..//components/DashCard";

export function Dashboard() {

    const card = [{
        id: 1,
        title: "Operações",
        link: "operations"
    },
    {
        id: 2,
        title: "Usuários",
        link: "users"
    },
    ];

    return (
        <Flex flexDirection="column">
            <Header />
            <SimpleGrid
                px={8}
                py={28}
                minChildWidth='280px'
                spacing='30px'
            >
                {card.map((c: any) => (
                    <DashCard key={c.id} title={c.title} link={c.link} />
                ))}
            </SimpleGrid>
        </Flex>
    );
}
