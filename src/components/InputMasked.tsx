import {
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input as ChakraInput,
    InputProps as ChakraInputProps
} from "@chakra-ui/react";
import React, { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";
import InputMask from "react-input-mask";

interface InputProps extends ChakraInputProps {
    name: string;
    label?: string;
    error?: FieldError | any;
    mask: string;
    bgColor?: string
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
    { name, label, bgColor = 'gray.900', error = null, mask, ...rest },
    ref
) => {

    return (
        <FormControl isInvalid={!!error}>
            {!!label && <FormLabel htmlFor={name}>{label}</FormLabel>}

            <ChakraInput
                as={InputMask}
                mask={mask}
                name={name}
                id={name}
                ref={ref}
                _placeholder={{ color: 'gray.300' }}
                border='none'
                bg={bgColor}
                h="12"
                px="5"
                borderRadius={4}
                {...rest}
            />

            {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
        </FormControl>
    );
};

export const InputMasked = forwardRef(InputBase);