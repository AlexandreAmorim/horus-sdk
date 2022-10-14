import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from '../contexts/auth'
import React from 'react'

type SignInFormData = {
    document: string
    password: string
}

const signInFormSchema = yup.object().shape({
    document: yup.string().required('Cpf obrigatório'),
    password: yup.string().required('Senha obrigatória'),
})

export function SignIn() {
    const { signIn } = useAuth()
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(signInFormSchema),
    })

    const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
        console.log(values)
        await new Promise((resolve) => setTimeout(resolve, 2000))
        await signIn(values)
    }

    return (
        <form onSubmit={handleSubmit(handleSignIn)}>
            <input
                name="document"
                type="text"
                {...register('document')}
            />
            <input
                name="password"
                type="password"
                {...register('password')}
            />
            <button
                type="submit"
            >
                Entrar
            </button>
        </form>
    )
}