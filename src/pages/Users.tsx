import { Flex, IconButton } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ListDashes } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from 'yup';
import { Header } from "../components/Header";

const signInFormSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    document: yup.string().required('Documento obrigatória'),
})

interface User {
    id: number,
    name: string,
    document: string,
    createdAt: string
}

export function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(signInFormSchema),
    })

    async function init() {
        const data = await window.Main.listUsers()
        console.log(data)
        setUsers(data)
    }

    useEffect(() => {
        init()
    }, [])

    async function handleSave(values: any) {
        let result = await window.Main.createUser(values);
        console.log("result", result)
        init();
    }
    return (
        <Flex flexDirection="column">
            <Header />
            <Link to="/">
                <IconButton
                    bg="gray.700"
                    aria-label='Search database'
                    icon={<ListDashes />}
                />
            </Link>
            <Flex bg="gray.700" as="form" onSubmit={handleSubmit(handleSave)}>
                <input
                    type="text"
                    name="name"
                    {...register('name')}
                />
                <input
                    type="text"
                    name="document"
                    {...register('document')}
                />

                <button
                    type="submit"
                >
                    Salvar
                </button>
            </Flex>

            <>
                {users && users.map((u: User) => (
                    <ul key={u.id}>
                        <li>{u.name}</li>
                        <li>{u.document}</li>
                        <li>{u.createdAt}</li>
                    </ul>
                ))}
            </>
        </Flex>
    );
}
