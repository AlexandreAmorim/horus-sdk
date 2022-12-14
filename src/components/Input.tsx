import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input as ChakraInput,
    InputProps as ChakraInputProps
} from '@chakra-ui/react'
import React, { forwardRef, ForwardRefRenderFunction } from 'react'
import { FieldError } from 'react-hook-form'

interface InputProps extends ChakraInputProps {
    name: string
    label?: string
    error?: FieldError | any
    bgColor?: string
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
    { name, label, bgColor = 'gray.900', error = null, ...rest },
    ref
) => {
    return (
        <FormControl isInvalid={!!error}>
            {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

            <ChakraInput
                name={name}
                id={name}
                ref={ref}
                {...rest}
                _placeholder={{ color: 'gray.300' }}
                border='none'
                bg={bgColor}
                h="12"
                px="5"
                borderRadius={4}
            />

            {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
        </FormControl>
    )
}

export const Input = forwardRef(InputBase)