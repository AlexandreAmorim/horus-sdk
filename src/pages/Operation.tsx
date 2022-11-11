import { Button, Flex, HStack, Stack, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { CalendarBlank, Clock } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ControlledSelect } from "../components/ControlledSelect";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { useAuth } from "../contexts/auth";

interface FormValues {
    team: string[],
    place: string,
    district: string
    county: string,
    complement: string,
    open: boolean,
}

const defaultValues: FormValues = {
    team: [],
    place: '',
    district: '',
    county: '',
    complement: '',
    open: true,
};

const formSchema = yup.object().shape({
});

export function Operation() {
    const { user } = useAuth()
    let navigate = useNavigate();
    const [dateState, setDateState] = useState(new Date());

    const { register, handleSubmit, reset, formState, control } = useForm<FormValues>({
        resolver: yupResolver(formSchema),
        defaultValues
    });
    const { errors } = formState;

    const handleCreateOp: SubmitHandler<any> = async (data: any) => {
        const _data = {
            ...data,
            cod: `${'OP' + dateState.getTime()}`,
            start_operation: dateState.toISOString().slice(0, 19).replace('T', ' '),
            document: user.document,
            district: data.district?.value,
            county: data.county?.value,
            team: data.team?.value,
            open: true
        };

        console.log(_data)

        try {
            let result = await window.Main.createOperation(_data);
            console.log("result", result)
            navigate('/approaches')
        } catch (err) {
            console.log("Error happened", err);
        }
    };


    useEffect(() => {
        setInterval(() => setDateState(new Date()), 30000);
    }, []);

    return (
        <Flex flexDirection="column">
            <Header />
            <Flex
                alignItems="center"
                justifyContent="center"
                flexDirection="column"
            >
                <Flex
                    as="form"
                    width="100%"
                    maxWidth={600}
                    p={[2, 4]}
                    flexDirection="column"
                    onSubmit={handleSubmit(handleCreateOp)}
                >
                    <Stack spacing="4">
                        <Text fontSize='2xl' align='center'>Nova Operação</Text>
                        <HStack justifyContent="space-between" bgColor="gray.700" borderRadius={4} p={4}>
                            <Flex alignItems="center" gap={1}>
                                <CalendarBlank size={20} />
                                {' '}
                                {dateState.toLocaleDateString('pt-BR',
                                    {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric',
                                    })}
                            </Flex>
                            <Flex alignItems="center" gap={1}>
                                <Clock size={20} />
                                {dateState.toLocaleString('pt-BR',
                                    {
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: false,
                                    })}
                            </Flex>
                        </HStack>

                        <ControlledSelect<FormValues, any, true>
                            label="Equipe"
                            instanceId="team"
                            name="team"
                            bgColor="gray.700"
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
                        <HStack>
                            <ControlledSelect<FormValues, any, true>
                                label="Município"
                                instanceId="county"
                                name="county"
                                bgColor="gray.700"
                                control={control}
                                options={[
                                    { value: 'RIO DE JANEIRO', label: 'RIO DE JANEIRO' },
                                    { value: 'NITEROI', label: 'NITEROI' },
                                    { value: 'DUQUE DE CAXIAS', label: 'DUQUE DE CAXIAS' },
                                    { value: 'SÃO GONÇALO', label: 'SÃO GONÇALO' },
                                ]}
                            />
                            <ControlledSelect<FormValues, any, true>
                                label="Bairro"
                                instanceId="district"
                                name="district"
                                bgColor="gray.700"
                                control={control}
                                options={[
                                    { value: 'CENTRO', label: 'CENTRO' },
                                    { value: 'BOTAFOGO', label: 'BOTAFOGO' },
                                    { value: 'BARRA DA TIJUCA', label: 'BARRA DA TIJUCA' },
                                    { value: 'LAGOA', label: 'LAGOA' },
                                ]}
                            />
                        </HStack>
                        <Input
                            name="place"
                            type="text"
                            label='Logradouro'
                            bgColor="gray.700"
                            error={errors.place}
                            {...register("place")}
                        />
                        <Input
                            name="complement"
                            type="text"
                            label='Complemento'
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
            </Flex>
        </Flex>
    );
}
