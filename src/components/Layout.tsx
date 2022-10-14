import React, { ReactNode } from "react";
import { useAuth } from "../../src/contexts/auth";

interface IPropsLayout {
    children: ReactNode
}

export function Layout({ children }: IPropsLayout) {
    const { signOut } = useAuth();

    return (
        <>
            <button onClick={signOut}>Sair</button>
            {children}
        </>
    );
}