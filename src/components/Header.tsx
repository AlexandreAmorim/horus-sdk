import { Flex, Text } from "@chakra-ui/react";
import React from "react";

export function Header() {
    return (
        <Flex
            as="header"
            w="100%"
            py={5}
            alignItems="center"
            justifyContent="center"
            bg="gray.700"
            borderBottom="1px"
            borderColor="gray.600"
        >

            <Text
                fontSize={['2xl', '3xl']}
                fontWeight="bold"
                letterSpacing="tight"
                w="64"
            >
                LeiSeca <Text as="span" ml="1" color="red.700"> | </Text> RJ
            </Text>
        </Flex>
    );
}