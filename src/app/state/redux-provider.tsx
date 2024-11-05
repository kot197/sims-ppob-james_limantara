"use client"; // This marks the component as a Client Component

import { useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from './store'
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<AppStore>()
    let persistor;

    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore();
    }

    persistor = persistStore(storeRef.current);

    return (
        <Provider store={storeRef.current}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>);
}