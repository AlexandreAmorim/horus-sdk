import { SimpleGrid } from "@chakra-ui/react";
import React, { useCallback, useEffect, useState } from "react";
import { DashCard } from "../components/DashCard";
import { Layout } from "../components/Layout";
import { useAuth } from "../contexts/auth";

export function Dashboard() {
    const { user } = useAuth();
    const [operations, setOperations] = useState<any>();

    const init = useCallback(async () => {
        const data = await window.Main.listOperationOpen(user)
        setOperations(data)
    }, [])
    console.log(operations)

    useEffect(() => {
        init()
    }, []);

    const card = [{
        id: 1,
        title: "Operações",
        link: operations ? "approaches" : "operations"
    },
    {
        id: 2,
        title: "Usuários",
        link: "users"
    },
    ];

    return (
        <Layout>
            <SimpleGrid
                minChildWidth='280px'
                gap={3}
                my={16}
                mx={4}
            >
                {card.map((c: any) => (
                    <DashCard key={c.id} title={c.title} link={c.link} />
                ))}
            </SimpleGrid>
        </Layout >
    );
}
