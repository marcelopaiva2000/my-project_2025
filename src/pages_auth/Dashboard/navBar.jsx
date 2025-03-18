import { FaUsers } from "react-icons/fa";
import { CiViewTable } from "react-icons/ci";
import { TbSettingsCog } from "react-icons/tb";
import { TbLogout2 } from "react-icons/tb";

import { useState, useEffect } from "react";
import { supabase } from "../../supabase/supabaseClient";
import { useAuth } from "../../context/AuthProvider";
import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  // Desativei porque ainda não há necessidade
  // const [loading, setLoading] = useState(true);
  const { session } = useAuth();
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const location = useLocation();

  // Chamar dados do usuario
  useEffect(() => {
    let ignore = false;

    async function getProfile() {
      // setLoading(true);
      const { user } = session;

      // logs para depuração
      // console.log('Session:', session)
      //  console.log('User:', user)

      const { data, error} = await supabase.from('profiles').select('name, email, avatar').eq('id', user.id).single()

      if (!ignore) {
        if (error) {
          console.log('Erro ao buscar perfil:', error.message)
        } else if (data) {
          setName(data.name)
          setEmail(data.email)
          setAvatar(data.avatar)
        }
      }

      // setLoading(false);
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, [session]);

  // Deslogar usuario
  async function signOut() {
    const { error } = supabase.auth.signOut();

    if (error) {
      console.error("Erro ao deslogar: ", error.message);
      return;
    }
  }

  return (
    <>
      <div className="flex fixed top-0 justify-end items-center py-8 w-full bg-white px-18">
        <div className="flex flex-row items-center gap-3">
          {!avatar ? (
            <>
              <p className="flex rounded-full w-12 h-12 border-[0.05px] border-[#8098F9] shadow-2xl items-center justify-center font-bold text-2xl bg-[#8098F9]">{name ? name.charAt(0) : ''}</p>
            </>
          ) : (
            <img src={avatar} alt="Avatar" className="rounded-full w-12 h-12 border-[0.05px] border-[#8098F9] drop-shadow-lg" />
          )}
          <div className="flex flex-col items-start">
            <p className="text-black text-left font-semibold text-md">{name}</p>
            <p className="text-gray-400 text-left font-medium text-sm">{email}</p>
          </div>
        </div>
      </div>  

      <div className="flex flex-col left-0 top-0 h-screen bg-[#8098F9] justify-between items-start pt-20 pb-10 px-10 rounded-tr-2xl rounded-br-2xl shadow-2xl z-0 w-65">
        <ul className="flex flex-col gap-4">
          <Link to='/dashboard/pacientes' className={`flex flex-row gap-3 items-center font-semibold tracking-wider text-2xl ${location.pathname === '/dashboard/pacientes' ? 'bg-white text-[#8098F9] rounded-2xl px-3 py-1 transition-colors duration-300 drop-shadow-lg' : 'text-gray-200 hover:text-white'}`}>
            <FaUsers />
            Pacientes
          </Link>
          <Link to='/dashboard/tabelas' className={`flex flex-row gap-3 items-center font-semibold tracking-wider text-2xl ${location.pathname === '/dashboard/tabelas' ? 'bg-white text-[#8098F9] rounded-2xl px-3 py-1 transition-colors duration-300 drop-shadow-lg' : 'text-gray-200 hover:text-white'}`}>
            <CiViewTable />
            Tabelas
          </Link>
        </ul>
        <ul className="flex flex-col gap-4">
          <Link to='/dashboard/configuracoes' className={`flex flex-row gap-3 items-center font-semibold tracking-wider text-xl ${location.pathname === '/dashboard/configuracoes' ? 'bg-white text-[#8098F9] rounded-2xl px-3 py-1 transition-colors duration-300 drop-shadow-lg' : 'text-white active:text-white'}`}>
            <TbSettingsCog />
            Configurações
          </Link>
          <Link
            onClick={signOut}
            className="flex flex-row gap-3 items-center font-semibold tracking-wider text-white active:text-white text-xl"
          >
            <TbLogout2 className="font-extrabold" />
            Sair
          </Link>
        </ul>
      </div>
    </>
  );
}
