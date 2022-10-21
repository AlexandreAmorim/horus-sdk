import React from "react";
import { ListDashes } from 'phosphor-react'
import { useNotification } from '../contexts/notification'
import { Layout } from "../components/Layout";
import { LoadingView } from "../components/LoadingView";
import { IconButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export function Operation() {
    const { isOnline } = useNotification()

    if (!isOnline) {
        return <LoadingView message="Aplicação está sem conexão com a internet. Você precisa estar on-line para iniciar a operação!" />
    }

    return (
        <Layout>
            <h1>Operation</h1>
            <Link to="/">
                <IconButton
                    bg="gray.700"
                    aria-label='Search database'
                    icon={<ListDashes />}
                />
            </Link>
        </Layout>
    );
}
