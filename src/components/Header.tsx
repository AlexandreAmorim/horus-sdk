import { Avatar, Box, Flex, IconButton, Text } from "@chakra-ui/react";
import { Gauge, SignOut } from "phosphor-react";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/auth";

export function Header() {
    const { signOut, user } = useAuth()

    async function handleSignOut() {
        await signOut()
    }

    return (
        <Flex
            as="header"
            w="100%"
            h="5rem"
            py={5}
            p={4}
            alignItems="center"
            justifyContent="space-between"
            bg="gray.700"
            borderBottom="1px"
            borderColor="gray.600"
            mb={4}
        >
            <Text
                fontSize={['2xl', '3xl']}
                fontWeight="bold"
                letterSpacing="tight"
                w="64"
            >
                LeiSeca <Text as="span" ml="1" color="red.700"> | </Text> RJ
            </Text>
            <Flex align="center">
                <Link to={`/`} >
                    <IconButton
                        _hover={{
                            bg: "gray.900"
                        }}
                        bg="gray.600"
                        aria-label='home'
                        icon={<Gauge />}
                        mr={2}
                    />
                </Link>
                <Link to={`/`}>
                    <IconButton
                        _hover={{
                            bg: "gray.900"
                        }}
                        onClick={handleSignOut}
                        bg="gray.600"
                        aria-label='home'
                        icon={<SignOut />}
                    />
                </Link>
            </Flex>
            <Flex align="center">
                <Box mr="4" textAlign="right" display={{ base: "none", md: "block" }}>
                    <Text>{user?.name}</Text>
                    <Text color="gray.400" fontSize="small">
                        {user?.document}
                    </Text>
                </Box>

                <Avatar size="md" name={user?.name} />
            </Flex>
        </Flex>
    );
}