import React, { createContext, useCallback, useContext, useState } from "react";
import uuid from "uuidv4"

// Toast
import ToastContainer from '../components/toastContainer';

export interface ToastMessage{
    id: string,
    type?: 'success' | 'error' | 'info';
    title: string;
    description?: string;
}

interface ToastContextData{
    addToast({type, title, description}: Omit<ToastMessage, 'id'>): void;
    removeToast(id: string): void;
}


const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export const ToastProvider: React.FC = ({children}) => {
    const [msgs,  setMsgs] = useState<ToastMessage[]>([]);

    const addToast = useCallback(({type, title, description}: Omit<ToastMessage, 'id'>) => {
        const id = uuid();
        console.log(type, title, description)
        const toast = {id, type, title, description}

        setMsgs((oldMsgs => [...oldMsgs, toast]))
    }, [])

    const removeToast = useCallback((id: string) => {
        setMsgs(state => state.filter(msgs => msgs.id !== id))
        console.log('removeToast')
    }, [])

  return (
      <ToastContext.Provider  value={{addToast, removeToast }}>
            {children}
            <ToastContainer messages={msgs} />
      </ToastContext.Provider>
  );
}


export function useToast(): ToastContextData{
    const context = useContext(ToastContext);

    if(!context){
        throw new Error("useToast must be used within an ToastProvider");
    }

    return context;
}