import { Navigate, Outlet } from 'react-router-dom';    
import { useEffect, useState } from 'react';
import { supabase } from '../supabase/supabaseClient';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ProtectedRoute = () => {
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

  if (loading) return (
      <div className='flex justify-center items-center h-screen'>
          <AiOutlineLoading3Quarters size={45} className='animate-spin text-emerald-500' />  
      </div>
  )

  // Se não estiver logado, redireciona para o login
  return session ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;