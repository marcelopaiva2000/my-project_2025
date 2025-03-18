import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabase/supabaseClient'

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Obtém a sessão do usuário no Supabase
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        // Monitora mudanças no estado de autenticação
        const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        // Remove o listener quando o componente é desmontado, evitando memory leaks
        return () => {
            if (subscription?.unsubscribe) {
                subscription.unsubscribe();
            }
        };
    }, []);

    return (
        <AuthContext.Provider value={{ session, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}