import { FcGoogle } from "react-icons/fc";
import { SiFacebook } from "react-icons/si";
import { TfiEmail } from "react-icons/tfi";
import { GoShieldSlash } from "react-icons/go";
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <div className="flex justify-center items-center h-screen bg-[#ebefffff]">
            <div className="flex flex-col justify-center items-center shadow-xl rounded-2xl py-28 px-16 bg-[#f5f8ffff] gap-4">

                <div className="flex flex-col justify-center items-center">
                    <h1 className="font-bold text-[38px]">Iniciar sessão</h1>
                    <p className="font-extralight text-[12px] mt-[-10px]">Selecione o método para iniciar a sessão:</p>
                </div>

                <div className="flex flex-row gap-4">
                    <button type="button" className="flex flex-row gap-1 cursor-pointer justify-center items-center border border-[#8098F9] rounded-[10px] px-4.5 py-1 shadow hover:bg-[#8098F9]">
                        <FcGoogle size={23}/>
                        <p className="font-medium text-[15px] ">Google</p>
                    </button>

                    <button type="button" className="flex flex-row gap-1 cursor-pointer justify-center items-center border border-[#8098F9] rounded-[10px] px-4.5 py-1 shadow hover:bg-[#8098F9]">
                        <SiFacebook size={23} className="text-[#3b5998]"/>
                        <p className="font-medium text-[15px]">Google</p>
                    </button>
                </div>

                <div className="w-full flex flex-row justify-center items-center gap-4">
                    <div className="w-full h-[0.7px] bg-[#71717A]" />
                    <p className="text-[#71717A] text-[12px]">ou</p>
                    <div className="w-full h-[0.7px] bg-[#71717A]" />
                </div>
                
                <form className="flex flex-col w-full gap-4">

                    <div className="flex flex-col w-full gap-2.5">
                        <div className="flex flex-col w-full justify-center">
                            <TfiEmail className="absolute ml-2 text-[#8098F9] opacity-70"/>
                            <input 
                                type="email" 
                                className="border rounded-[10px] border-[#8098F9] bg-[#ebefffff] pl-7 pr-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#8098F9] placeholder-[#8098F9] placeholder:opacity-70 text-[15px]"
                                placeholder="Email"/>
                        </div>

                        <div className="flex flex-col w-full justify-center">
                            <GoShieldSlash className="absolute ml-2 text-[#8098F9] opacity-70"/>
                            <input 
                                type="password" 
                                className="border rounded-[10px] border-[#8098F9] bg-[#ebefffff] pl-7 pr-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#8098F9] placeholder-[#8098F9] placeholder:opacity-70 text-[15px]"
                                placeholder="Senha"/>
                        </div>
                    </div>
                    
                    <button type="submit" className="bg-[#7f98faff] rounded-[10px] py-2 font-bold text-white hover:opacity-70 cursor-pointer">
                        ENTRAR
                    </button>

                    <div className="flex justify-center items-center">
                        <p className="text-[14px] text-[#71717A]">
                            Não tem uma conta? 
                            <Link to="/register" className="text-[#7f98faff] hover:opacity-70 font-bold"> Registre-se</Link>
                        </p>
                    </div>
                    
                </form>

            </div>
        </div>
    )
}