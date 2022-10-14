import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'

const signInFormSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    local: yup.string().required('local obrigatória'),
})

interface User {
    id: number,
    name: string,
    local: string,
    createdAt: string
}

export function Dashboard() {
    const [users, setUsers] = useState<User[]>([]);
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(signInFormSchema),
    })

    async function init() {
        const data = await window.Main.fileApi()
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
        <Layout>
            <>
                <input
                    type="text"
                    name="name"
                    {...register('name')}
                />
                <input
                    type="text"
                    name="local"
                    {...register('local')}
                />

                <button
                    type="submit"
                >
                    Salvar
                </button>
            </>

            <>
                {users && users.map((u: User) => (
                    <ul key={u.id}>
                        <li>{u.name}</li>
                        <li>{u.local}</li>
                        <li>{u.createdAt}</li>
                    </ul>
                ))}
            </>
        </Layout>
    );
}
