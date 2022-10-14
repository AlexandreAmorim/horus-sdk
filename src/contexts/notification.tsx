import React from 'react';
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface NotificationProviderProps {
    children: ReactNode;
}

interface Note {
    message: string;
}

interface INotificationContextData {
    note: Note;
}

const NotificationContext = createContext({} as INotificationContextData);

function NotificationProvider({ children }: NotificationProviderProps) {
    const [note, setNote] = useState<Note>({} as Note);
    const [userLoading, setUserStorgeLoading] = useState(true);

    useEffect(() => {
        async function loadStorageData() {
            setUserStorgeLoading(true);
            const alertOnlineStatus = navigator.onLine ? 'online' : 'offline'

            window.Main.notificationApi(alertOnlineStatus);
            setUserStorgeLoading(false);
        }
        loadStorageData();
    }, []);

    return (
        <NotificationContext.Provider value={{
            note,
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