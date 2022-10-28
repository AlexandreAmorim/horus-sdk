import { Button, Flex, IconButton, Stack, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ListDashes } from "phosphor-react";
import React, { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { ControlledSelect } from "../components/ControlledSelect";
import { Input } from "../components/Input";
import { InputMasked } from "../components/InputMasked";
import { Layout } from "../components/Layout";
import { LoadingView } from "../components/LoadingView";
import { useAuth } from "../contexts/auth";
import { useNotification } from '../contexts/notification';
import parseDate from "../utils/parseDate";

interface FormValues {
    team: string[],
    place: string,
    district: string
    county: string,
    date_operation: string
    complement: string,
    open: boolean,
}

const defaultValues: FormValues = {
    team: [],
    place: '',
    district: '',
    county: '',
    date_operation: '',
    complement: '',
    open: true,
};

const formSchema = yup.object().shape({
    date_operation: yup
        .string()
        .transform(parseDate)
        .typeError("Insira uma data válida"),
});

export function Operation() {
    const { isOnline } = useNotification()
    const [operations, setOperations] = useState<any[]>([]);
    const { signOut } = useAuth()

    const { register, handleSubmit, reset, formState, control } = useForm<FormValues>({
        resolver: yupResolver(formSchema),
        defaultValues
    });
    const { errors } = formState;
    if (!isOnline) {
        return <LoadingView message="Aplicação está sem conexão com a internet. Você precisa estar on-line para iniciar a operação!" />
    }

    const init = useCallback(async () => {
        const data = await window.Main.listOperations()
        console.log(data)
        setOperations(data)
    }, [])

    useEffect(() => {
        init()
    }, [])

    const handleCreateOp: SubmitHandler<any> = async (data: any) => {
        const _user = {
            ...data,
            document: '04160807747',
            district: data.district?.value,
            county: data.county?.value,
            team: data.team?.value,
            open: true
        };

        try {
            console.log("User ", _user)
            let result = await window.Main.createOperation(_user);
            console.log("result", result)
            init();
        } catch (err) {
            console.log("Error happened", err);
        }
    };

    return (
        <Layout operations={operations}>
            <Link to="/">
                <IconButton
                    bg="gray.700"
                    aria-label='Search database'
                    icon={<ListDashes />}
                />
            </Link>
            <Flex
                alignItems="center"
                justifyContent="center"
            >
                <Flex
                    as="form"
                    width="100%"
                    maxWidth={400}
                    p={[6, 8]}
                    flexDirection="column"
                    onSubmit={handleSubmit(handleCreateOp)}
                >
                    <Stack spacing="4">
                        <Text fontSize='2xl' align='center'>Nova Operação</Text>
                        <ControlledSelect<FormValues, any, true>
                            placeholder="Equipe"
                            instanceId="team"
                            name="team"
                            control={control}
                            options={[
                                { value: 'A1', label: 'A1' },
                                { value: 'A2', label: 'A2' },
                                { value: 'A3', label: 'A3' },
                                { value: 'A4', label: 'A4' },
                                { value: 'A5', label: 'A5' },
                                { value: 'A6', label: 'A6' },
                                { value: 'A7', label: 'A7' },
                                { value: 'A8', label: 'A8' },
                                { value: 'A9', label: 'A9' },
                                { value: 'A10', label: 'A10' },
                                { value: 'B1', label: 'B1' },
                                { value: 'B2', label: 'B2' },
                                { value: 'B3', label: 'B3' },
                                { value: 'B4', label: 'B4' },
                                { value: 'B5', label: 'B5' },
                                { value: 'B6', label: 'B6' },
                                { value: 'B7', label: 'B7' },
                                { value: 'B8', label: 'B8' },
                                { value: 'B9', label: 'B9' },
                                { value: 'B10', label: 'B10' },
                                { value: 'C1', label: 'C1' },
                                { value: 'C2', label: 'C2' },
                                { value: 'C3', label: 'C3' },
                                { value: 'C4', label: 'C4' },
                                { value: 'C5', label: 'C5' },
                                { value: 'C6', label: 'C6' },
                                { value: 'C7', label: 'C7' },
                                { value: 'C8', label: 'C8' },
                                { value: 'C9', label: 'C9' },
                                { value: 'C10', label: 'C10' },
                            ]}
                        />
                        <InputMasked
                            mask="99/99/9999"
                            name="date_operation"
                            placeholder='Data da Operação'
                            bgColor="gray.700"
                            error={errors.date_operation}
                            {...register("date_operation")}
                        />
                        <ControlledSelect<FormValues, any, true>
                            placeholder="Município"
                            instanceId="county"
                            name="county"
                            control={control}
                            options={[
                                { value: 'RIO DE JANEIRO', label: 'RIO DE JANEIRO' },
                                { value: 'NITEROI', label: 'NITEROI' },
                                { value: 'DUQUE DE CAXIAS', label: 'DUQUE DE CAXIAS' },
                                { value: 'SÃO GONÇALO', label: 'SÃO GONÇALO' },
                            ]}
                        />
                        <ControlledSelect<FormValues, any, true>
                            placeholder="Bairro"
                            instanceId="district"
                            name="district"
                            control={control}
                            options={[
                                { value: 'CENTRO', label: 'CENTRO' },
                                { value: 'BOTAFOGO', label: 'BOTAFOGO' },
                                { value: 'BARRA DA TIJUCA', label: 'BARRA DA TIJUCA' },
                                { value: 'LAGOA', label: 'LAGOA' },
                            ]}
                        />
                        <Input
                            name="place"
                            type="text"
                            placeholder='Logradouro'
                            bgColor="gray.700"
                            error={errors.place}
                            {...register("place")}
                        />
                        <Input
                            name="complement"
                            type="text"
                            placeholder='Complemento'
                            bgColor="gray.700"
                            error={errors.complement}
                            {...register("complement")}
                        />
                    </Stack>
                    <Button
                        type="submit"
                        py="4"
                        mt="6"
                        bg="blue.600"
                        h="12"
                        borderRadius={4}
                        color="white"
                        _hover={{
                            bg: "blue.700",
                        }}
                        fontSize='sm'
                        isLoading={formState.isSubmitting}
                    >
                        AVANÇAR
                    </Button>
                </Flex>
            </Flex >
        </Layout>
    );
}
