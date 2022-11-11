import { Flex } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { Header } from "./Header";

interface IPropsLayout {
    children: ReactNode
}

export function Layout({ children }: IPropsLayout) {

    return (
        <Flex
            flexDirection="column"
            h="100%"
        >
            <Header />

            {children}
        </Flex>
    );
}

