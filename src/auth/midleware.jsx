import { Navigate, Outlet } from 'react-router-dom';    
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAuth } from '../context/AuthProvider'

export const ProtectedRoute = () => {
  const { session, loading } = useAuth()

  if (loading) return (
      <div className='flex justify-center items-center h-screen'>
          <AiOutlineLoading3Quarters size={45} className='animate-spin text-emerald-500' />  
      </div>
  )

  // Se não estiver logado, redireciona para o login
  return session ? <Outlet /> : <Navigate to="/login" />;
};

export const RedirectIfAuthenticated = () => {
  const { session, loading } = useAuth()

  if (loading) return (
      <div className='flex justify-center items-center h-screen'>
          <AiOutlineLoading3Quarters size={45} className='animate-spin text-emerald-500' />  
      </div>
  )

  // Se não estiver logado, redireciona para o login
  return session ? <Navigate to="/dashboard" /> : <Outlet />;
};


