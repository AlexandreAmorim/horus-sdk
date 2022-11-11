import {
    extendTheme,
    theme as base
} from "@chakra-ui/react";

export const theme = extendTheme(
    {
        styles: {
            global: {
                // styles for the `body`
                body: {
                    bg: 'gray.900',
                    color: 'gray.100',
                    '&::-webkit-scrollbar': {
                        width: '16px',
                        height: '16px',
                    },

                    '&::-webkit-scrollbar-thumb': {
                        with: '2px',
                        backgroundColor: '#29292E',
                        borderWidth: '8 0 8 0',
                    },
                },
            },
        },
        colors: {
            green: {
                "300": '#00B37E',
                "500": '#00875F',
                "700": '#015F43',
            },
            orange: {
                "500": '#FBA94C',
            },
            red: {
                "500": '#F75A68',
            },
            gray: {
                "100": '#E1E1E6',
                "200": '#C4C4CC',
                "300": '#8D8D99',
                "500": '#323238',
                "600": '#29292E',
                "700": '#121214',
                "900": '#09090A'
            },
            brand: {
                "900": "#181B23",
                "800": "#1F2029",
                "700": "#353646",
                "600": "#4B4D63",
                "500": "#616480",
                "400": "#797D9A",
                "300": "#9699B0",
                "200": "#B3B5C6",
                "100": "#D1D2DC",
                "50": "#EEEEF2",
            },
        },
        fonts: {
            heading: `Roboto, ${base.fonts.heading}`,
            body: `Roboto, ${base.fonts.body}`,
        },
    },

);