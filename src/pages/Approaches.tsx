import {
    Box,
    Button,
    Flex, HStack,
    List,
    ListItem,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, SimpleGrid, Stack, StackDivider, Text,
    useDisclosure
} from '@chakra-ui/react';
import { yupResolver } from "@hookform/resolvers/yup";
import { CalendarBlank, Clock } from 'phosphor-react';
import React, { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ControlledSelect } from '../components/ControlledSelect';
import { Input } from '../components/Input';
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

interface OpProps {
    id: string;
    cod: string;
    county: string;
    district: string;
    place: string;
    complement: string;
    open: boolean;
    streaming: boolean;
    start_operation: Date;
}

const formSchema = yup.object().shape({
    date_operation: yup
        .string()
        .transform(parseDate)
        .typeError("Insira uma data válida"),
});

export function Approaches() {
    const { isOnline } = useNotification()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [operation, setOperation] = useState<OpProps>({} as OpProps);
    const { user } = useAuth()
    let navigate = useNavigate();

    const { register, handleSubmit, reset, formState, control } = useForm<FormValues>({
        resolver: yupResolver(formSchema),
        defaultValues
    });
    const { errors } = formState;
    if (!isOnline) {
        return <LoadingView message="Aplicação está sem conexão com a internet. Você precisa estar on-line para iniciar a operação!" />
    }

    const init = useCallback(async () => {
        const data = await window.Main.listOperationOpen(user)
        console.log(data)
        setOperation(data)
    }, [])

    useEffect(() => {
        init()
    }, [])

    const handleCreateOp: SubmitHandler<any> = async (data: any) => {
        const _user = {
            ...data,
            document: user.document,
            district: data.district?.value,
            county: data.county?.value,
            team: data.team?.value,
            open: true
        };

        try {
            console.log("User ", _user)
            let result = await window.Main.createOperation(_user);
            console.log("result", result)
            navigate('/approaches')
            reset();
            init();
        } catch (err) {
            console.log("Error happened", err);
        }
    };

    return (
        <Layout>
            <Flex as="main" >
                <SimpleGrid
                    border="1px"
                    borderColor="gray.500"
                    borderRadius={4}
                    bg='gray.700'
                    p={4}
                    width='480px'
                    mx={4}
                >
                    {operation && (
                        <Stack spacing={{ base: 6, md: 10 }}>
                            <Box as={'header'}>
                                <Text
                                    color='gray.400'
                                    fontWeight={300}
                                    fontSize={'2xl'}>
                                    {operation.cod}
                                </Text>
                                <HStack>
                                    <>
                                        <CalendarBlank size={20} />
                                        {operation?.start_operation}
                                        <Clock size={20} />
                                        {operation.start_operation}
                                    </>
                                </HStack>
                            </Box>

                            <Stack
                                spacing={{ base: 4, sm: 6 }}
                                direction={'column'}
                                divider={
                                    <StackDivider
                                        borderColor='gray.500'
                                    />
                                }>
                                <Box>
                                    <Text
                                        fontSize={{ base: '16px', lg: '18px' }}
                                        color='yellow.500'
                                        fontWeight={'500'}
                                        textTransform={'uppercase'}
                                        mb={'4'}>
                                        LOCAL
                                    </Text>

                                    <SimpleGrid>
                                        <List spacing={2}>
                                            <ListItem>{operation.place}</ListItem>
                                            <ListItem>{operation.complement}</ListItem>
                                        </List>
                                        <List spacing={2}>
                                            <ListItem>
                                                {operation.district}{' - '}
                                                {operation.county}
                                            </ListItem>
                                        </List>
                                    </SimpleGrid>
                                </Box>
                                <Box>
                                    <Text
                                        fontSize={{ base: '16px', lg: '18px' }}
                                        color='yellow.500'
                                        fontWeight={'500'}
                                        textTransform={'uppercase'}
                                        mb={'4'}>
                                        Product Details
                                    </Text>

                                    <List spacing={2}>
                                        <ListItem>
                                            <Text as={'span'} fontWeight={'bold'}>
                                                Between lugs:
                                            </Text>{' '}
                                            20 mm
                                        </ListItem>
                                        <ListItem>
                                            <Text as={'span'} fontWeight={'bold'}>
                                                Case diameter:
                                            </Text>{' '}
                                            42 mm
                                        </ListItem>
                                        <ListItem>
                                            <Text as={'span'} fontWeight={'bold'}>
                                                Dial color:
                                            </Text>{' '}
                                            Black
                                        </ListItem>

                                        <ListItem>
                                            <Text as={'span'} fontWeight={'bold'}>
                                                Water resistance:
                                            </Text>{' '}
                                            5 bar (50 metres / 167 feet){' '}
                                        </ListItem>
                                    </List>
                                </Box>
                            </Stack>

                            <Button
                                rounded={'none'}
                                w={'full'}
                                mt={8}
                                size={'lg'}
                                py={'7'}
                                bg='gray.900'
                                color='white'
                                textTransform={'uppercase'}
                                _hover={{
                                    transform: 'translateY(2px)',
                                    boxShadow: 'lg',
                                }}>
                                Add to cart
                            </Button>

                            <Stack direction="row" alignItems="center" justifyContent={'center'}>
                                <Text>2-3 business days delivery</Text>
                            </Stack>
                        </Stack>
                    )}
                </SimpleGrid>
                <Modal isOpen={isOpen} onClose={onClose} size="3xl">
                    <ModalOverlay />
                    <ModalContent bgColor="gray.700" border={1}>
                        <ModalHeader>
                            <Text fontSize='2xl' align='center'>Registrar Abordagem</Text>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody >
                            <Flex
                                as="form"
                                width="100%"
                                p={[4, 4]}
                                flexDirection="column"
                                onSubmit={handleSubmit(handleCreateOp)}
                            >
                                <Text>Dados da Abordagem</Text>
                                <HStack m={2}>
                                    <ControlledSelect<FormValues, any, true>
                                        placeholder="Evasão"
                                        instanceId="team"
                                        name="team"
                                        control={control}
                                        options={[
                                            { value: true, label: 'Sim' },
                                            { value: false, label: 'Não' },
                                        ]}
                                    />
                                    <ControlledSelect<FormValues, any, true>
                                        placeholder="Abordado por"
                                        instanceId="team"
                                        name="team"
                                        control={control}
                                        options={[
                                            { value: true, label: 'Sim' },
                                            { value: false, label: 'Não' },
                                        ]}
                                    />
                                </HStack>
                                <Text>Dados do Veículo</Text>
                                <HStack m={2}>
                                    <ControlledSelect<FormValues, any, true>
                                        placeholder="Categoria"
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
                                        placeholder="Marca"
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
                                </HStack>
                                <HStack m={2}>
                                    <ControlledSelect<FormValues, any, true>
                                        placeholder="Modelo"
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
                                    <ControlledSelect<FormValues, any, true>
                                        placeholder="Identificação"
                                        instanceId="district"
                                        name="district"
                                        control={control}
                                        options={[
                                            { value: 1, label: 'Placa' },
                                            { value: 2, label: 'Chassi' },
                                        ]}
                                    />
                                </HStack>
                                <HStack m={2}>
                                    <Input
                                        name="Numero"
                                        type="text"
                                        placeholder='Numero'
                                        error={errors.place}
                                        {...register("place")}
                                    />
                                    <ControlledSelect<FormValues, any, true>
                                        placeholder="Situação CRLV"
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
                                </HStack>
                                <Text>Dados do Condutor</Text>
                                <HStack m={2}>
                                    <ControlledSelect<FormValues, any, true>
                                        placeholder="Categoria CNH"
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
                                        placeholder="Situação CNH"
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
                                </HStack>
                                <HStack m={2}>
                                    <Input
                                        name="sexo"
                                        type="text"
                                        placeholder='Documento'
                                        error={errors.place}
                                        {...register("place")}
                                    />
                                    <ControlledSelect<FormValues, any, true>
                                        placeholder="Nascimento"
                                        instanceId="district"
                                        name="district"
                                        control={control}
                                        options={[
                                            { value: 1, label: 'Placa' },
                                            { value: 2, label: 'Chassi' },
                                        ]}
                                    />
                                </HStack>
                                <HStack m={2}>
                                    <Input
                                        name="name"
                                        type="text"
                                        placeholder='Nome'
                                        error={errors.place}
                                        {...register("place")}
                                    />
                                    <ControlledSelect<FormValues, any, true>
                                        placeholder="Sexo"
                                        instanceId="district"
                                        name="district"
                                        control={control}
                                        options={[
                                            { value: 1, label: 'Placa' },
                                            { value: 2, label: 'Chassi' },
                                        ]}
                                    />
                                </HStack>
                            </Flex>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                py="4"
                                h="12"
                                borderRadius={4}
                                color="white"
                                _hover={{
                                    bg: "gray.900",
                                }}
                                fontSize='sm'
                                bgColor="gray.700"
                                mr={3}
                                onClick={onClose}>
                                Fechar
                            </Button>
                            <Button
                                type="submit"
                                py="4"
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
                                Salvar
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Flex>
        </Layout>

    );
}
