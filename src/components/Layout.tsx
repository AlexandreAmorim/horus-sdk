import { Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface IPropsLayout {
    operations?: any[];
    children: ReactNode
}

export function Layout({ operations, children }: IPropsLayout) {

    return (
        <Flex flexDirection="column" minH="100vh">
            <Header />

            <Flex as="main" flex="1">
                <Flex flex="1" flexDirection="column">
                    {children}
                </Flex>
                <Sidebar operations={operations} />
            </Flex>
        </Flex>
    );
}

