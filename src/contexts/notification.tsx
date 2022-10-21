import React from 'react';
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface NotificationProviderProps {
    children: ReactNode;
}

interface INotificationContextData {
    isOnline: boolean;
}

const NotificationContext = createContext({} as INotificationContextData);

function NotificationProvider({ children }: NotificationProviderProps) {
    const [isOnline, setIsOnline] = useState<boolean>(false);

    useEffect(() => {
        async function loadOnline() {
            const alertOnlineStatus = navigator.onLine ? true : false
            setIsOnline(alertOnlineStatus)
        }
        loadOnline();
    }, []);

    return (
        <NotificationContext.Provider value={{
            isOnline,
        }}>
            {children}
        </NotificationContext.Provider>
    );
}

function useNotification() {
    const context = useContext(NotificationContext);

    if (!context) {
        throw new Error('useNotification must be used within an AutProvider');
    }

    return context;
}

export { NotificationProvider, useNotification };