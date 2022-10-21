import React from 'react'
import { Flex, Stack, Text, Button, useToast, Image } from '@chakra-ui/react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { isNetworkError } from '../service/api';
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from '../contexts/auth'
import { Input } from '../components/Input'

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
    const toast = useToast()
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(signInFormSchema),
    })

    const { errors } = formState

    const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000))
            await signIn(values)

        } catch (err) {

            if (isNetworkError(err)) {
                toast({
                    title: 'Usuário sem acesso.',
                    description: "Você está sem acesso à internet ou o servidor está off-line.",
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
                return;
            }

            if (err.response && err.response.status === 429) {
                toast({
                    title: 'Opsss!',
                    description: 'Você excedeu o limite de requisições para o servidor.',
                });
                return;
            }

            if (err.response && err.response.status === 400) {
                const { message } = Array.isArray(err.response.data)
                    ? err.response.data[0]
                    : err.response.data;
                toast({
                    title: message,
                });
                return;
            }

            toast({
                title: 'Error',
                description: 'Erro ao tentar autenticar na aplicação',
            });
        }
    }

    return (
        <Flex
            w="100vw"
            h="100vh"
            alignItems="center"
            justifyContent="center"
            flexDirection={['column', 'row']}
        >
            <Stack p={[6, 8]} spacing="4" mr={[0, 0, 0, 100]}>
                <Text
                    fontSize={['2xl', '3xl']}
                    fontWeight="bold"
                    letterSpacing="tight"
                    w="64"
                >
                    LeiSeca <Text as="span" ml="1" color="red.700"> | </Text> RJ
                </Text>
            </Stack>
            <Flex
                as="form"
                width="100%"
                maxWidth={400}
                p={[6, 8]}
                bg="gray.700"
                border="1px"
                borderColor="gray.500"
                borderRadius={8}
                flexDirection="column"
                onSubmit={handleSubmit(handleSignIn)}
            >
                <Stack spacing="4">
                    <Text fontSize='2xl' align='center'>Acesso ao Sistema</Text>
                    <Input
                        name="document"
                        type="text"
                        placeholder='Digite o cpf'
                        {...register('document')}
                        error={errors.document}
                    />
                    <Input
                        name="password"
                        type="password"
                        placeholder='Digite a senha'
                        {...register('password')}
                        error={errors.password}
                    />
                </Stack>
                <Button
                    type="submit"
                    py="4"
                    mt="6"
                    bg="blue.600"
                    h="14"
                    borderRadius={4}
                    color="white"
                    _hover={{
                        bg: "blue.700",
                    }}
                    fontSize='sm'
                    isLoading={formState.isSubmitting}
                >
                    ACESSAR
                </Button>
            </Flex>
        </Flex >
    )
}