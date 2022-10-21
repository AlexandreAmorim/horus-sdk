import { Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface IPropsLayout {
    children: ReactNode
}

export function Layout({ children }: IPropsLayout) {

    return (
        <Flex flexDirection="column" minH="100vh">
            <Header />

            <Flex as="main" flex="1">
                <Flex flex="1">
                    {children}
                </Flex>
                <Sidebar />
            </Flex>
        </Flex>
    );
}

