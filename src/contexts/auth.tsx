import React from 'react';
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import api from "../service/api";
import { useToast } from '@chakra-ui/react'

interface AuthProviderProps {
    children: ReactNode;
}

type SignInCredentials = {
    document: string
    password: string
}

interface User {
    id: string;
    name: string;
    email: string;
    token?: string;
    refresh_token?: string;
}

interface IAuthContextData {
    user: User;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): Promise<void>;
    userLoading: boolean;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
    const userStorgeKey = '@horus-desktop:user';
    const [user, setUser] = useState<User>({} as User);
    const [userLoading, setUserStorgeLoading] = useState(true);
    const toast = useToast()

    const signIn = useCallback(async ({ document, password }: SignInCredentials) => {
        const { status, data } = await api.post('/auth/login', {
            document,
            password,
        })

        if (status === 200) {
            const { token, refresh_token, user } = data;
            const { allocation } = user;

            if (allocation.management_id !== 1) {
                toast({
                    title: 'Usuário sem acesso.',
                    description: "Não foi possível acessar o sistema.",
                    status: 'warning',
                    duration: 9000,
                    isClosable: true,
                })
            } else {
                const userLogged = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    token: token,
                    refresh_token: refresh_token
                }

                setUser(userLogged);
                await localStorage.setItem(userStorgeKey, JSON.stringify(userLogged));

                const storagedUser = await localStorage.getItem(userStorgeKey);
                console.log("storagedUser ", storagedUser)
            }
        }
    }, [])

    async function signOut() {
        setUser({} as User);
        await localStorage.removeItem(userStorgeKey);
    }

    useEffect(() => {
        async function loadStorageData() {
            const storagedUser = await localStorage.getItem(userStorgeKey);

            if (storagedUser) {
                const userLogged = JSON.parse(storagedUser) as User;
                setUser(userLogged);
            }

            setUserStorgeLoading(false);
        }
        loadStorageData();
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            signIn,
            signOut,
            userLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AutProvider');
    }

    return context;
}

export { AuthProvider, useAuth };