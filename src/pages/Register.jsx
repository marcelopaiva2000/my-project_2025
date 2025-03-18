// Icons
import { TfiEmail } from "react-icons/tfi";
import { GoShieldSlash } from "react-icons/go";
import { FaRegUser } from "react-icons/fa6";
import { BiSolidUserBadge } from "react-icons/bi";
import { BsPhone } from "react-icons/bs";
import { PiCity } from "react-icons/pi";
import { FaMapLocationDot } from "react-icons/fa6";
import { RxEyeOpen } from "react-icons/rx";
import { RxEyeNone } from "react-icons/rx";

// Importações de Lib
import { useHookFormMask  } from "use-mask-input";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserSchema } from '../auth/shema'
import { supabase } from '../supabase/supabaseClient'
import toast from "react-hot-toast";

export default function Register() {
    const [adress, setAdress] = React.useState({city: ''});
    const { 
        register, 
        handleSubmit,
        formState: { errors },
        setValue,
        reset
    } = useForm({
        resolver: zodResolver(createUserSchema)
    });
    const registerWithMask = useHookFormMask(register);
    const [passwordVisible, setPasswordVisible] = React.useState(false);
    const navigate = useNavigate()

    // Função para buscar o endereço pelo CEP
    async function handleZipCode(e) {
        const zipcode = e.target.value

        const res = await fetch(`https://brasilapi.com.br/api/cep/v2/${zipcode}`)
    
        if (res.ok) {
            // Aqui vai buscar os dados do objeto que esta retornando
            const data = await res.json() 
            // Aqui vai inserir no city do adress, a informação que buscou nos dados da API que está no campo city da API.
            setAdress({
                city: data.city
            });
            // Aqui vai inserir o valor que buscamos da API que está no campo city da API e inserir no campo city do react-hook-form
            setValue("city", data.city);
        } 
    }

    async function createUser(formData) {
        const { error } = await supabase.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                data: {
                    name: formData.name,
                    cpf: formData.cpf,
                    phone: formData.phone,
                    cep: formData.cep,
                    city: formData.city,
                    email: formData.email,
                }
            }
        });
        
        if (error) {
            toast.error('Erro ao cadastrar o usuário')
            console.erro('Erro ao criar o usuário', error.message)
            return;
        }

        console.log(formData)
        toast.success("Usuário cadastrado com sucesso!")
        setAdress({ city: '' });
        setValue("city", "")
        reset();

        navigate('/login')
    }

    return (
        <div className="flex justify-center items-center h-screen bg-[#ebefffff]">
            <div className="flex flex-col justify-center items-center shadow-xl rounded-2xl py-20 px-16 bg-[#f5f8ffff] gap-4">

                <div className="flex flex-col justify-center items-center">
                    <h1 className="font-bold text-[38px]">Crie a sua conta</h1>
                    <p className="font-extralight text-[12px] mt-[-10px]">Desbloqueie todas as funcionalidades!</p>
                </div>

                <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit(createUser)}>

                    <div className="flex flex-col w-full gap-2.5">

                        <div className="relative">
                            <FaRegUser className="absolute ml-2 mt-2.5 text-[#8098F9] opacity-70"/>
                            <input 
                                {...register('name')}
                                type="text" 
                                className="border rounded-[10px] border-[#8098F9] bg-[#ebefffff] pl-7 pr-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#8098F9] placeholder-[#8098F9] placeholder:opacity-70 text-[15px] w-full"
                                placeholder="Nome Completo"/>

                            {errors.name && (
                                <p className="text-[11px] text-red-600 ml-1">{errors.name.message}</p>
                            )}
                        </div>

                        <div className="relative">
                            <TfiEmail className="absolute ml-2 mt-2.5 text-[#8098F9] opacity-70"/>
                            <input 
                                {...register('email')}
                                type="email" 
                                className="border rounded-[10px] border-[#8098F9] bg-[#ebefffff] pl-7 pr-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#8098F9] placeholder-[#8098F9] placeholder:opacity-70 text-[15px] w-full"
                                placeholder="Email"/>
                                
                            {errors.email && (
                                <p className="text-[11px] text-red-600 ml-1">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="relative">
                            <GoShieldSlash className="absolute ml-2 mt-2.5 text-[#8098F9] opacity-70"/>
                            <input 
                                {...register('password')}
                                type={passwordVisible ? 'text' : 'password'}
                                className="border rounded-[10px] border-[#8098F9] bg-[#ebefffff] pl-7 pr-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#8098F9] placeholder-[#8098F9] placeholder:opacity-70 text-[15px] w-full"
                                placeholder="Senha"/>

                            {errors.password && (
                                <p className="text-[11px] text-red-600 ml-1">{errors.password.message}</p>
                            )}
                                                        
                            <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className="absolute top-2.5 right-2"> 
                                {passwordVisible ? <RxEyeOpen /> : <RxEyeNone />}
                            </button>
                        </div>

                        <div className="relative">
                            <BiSolidUserBadge className="absolute ml-2 mt-2.5 text-[#8098F9] opacity-70"/>
                            <input 
                                {...registerWithMask('cpf', '999.999.999-99')}
                                type="text" 
                                className="border rounded-[10px] border-[#8098F9] bg-[#ebefffff] pl-7 pr-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#8098F9] placeholder-[#8098F9] placeholder:opacity-70 text-[15px] w-full"
                                placeholder="CPF"/>

                            {errors.cpf && (
                                <p className="text-[11px] text-red-600 ml-1">{errors.cpf.message}</p>
                            )}
                        </div>

                        <div className="relative">
                            <BsPhone className="absolute ml-2 mt-2.5 text-[#8098F9] opacity-70"/>
                            <input 
                                {...registerWithMask('phone', '(99) 99999-9999')}
                                type="phone" 
                                className="border rounded-[10px] border-[#8098F9] bg-[#ebefffff] pl-7 pr-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#8098F9] placeholder-[#8098F9] placeholder:opacity-70 text-[15px] w-full"
                                placeholder="Telefone"/>

                            {errors.phone && (
                                <p className="text-[11px] text-red-600 ml-1">{errors.phone.message}</p>
                            )}
                        </div>

                        <div className="relative">
                            <FaMapLocationDot className="absolute ml-2 mt-2.5 text-[#8098F9] opacity-70"/>
                            <input 
                                {...registerWithMask('cep', '99999-999')}
                                type="text"
                                className="border rounded-[10px] border-[#8098F9] bg-[#ebefffff] pl-7 pr-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#8098F9] placeholder-[#8098F9] placeholder:opacity-70 text-[15px] w-full"
                                placeholder="CEP"
                                onBlur={handleZipCode}
                                />

                            {errors.cep && (
                                <p className="text-[11px] text-red-600 ml-1">{errors.cep.message}</p>
                            )}
                        </div>

                        <div className="relative">
                            <PiCity className="absolute ml-2 mt-2.5 text-[#8098F9] opacity-70"/>
                            <input 
                                disabled
                                type="text" 
                                className="border rounded-[10px] border-[#8098F9] bg-[#ebefffff] pl-7 pr-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#8098F9] placeholder-[#8098F9] placeholder:opacity-70 text-[15px] w-full"
                                placeholder="Cidade"
                                value={adress.city}
                                {...register('city')}
                                />

                            {errors.city && (
                                <p className="text-[11px] text-red-600 ml-1">{errors.city.message}</p>
                            )}
                        </div>

                    </div>
                    
                    <button type="submit" className="bg-[#7f98faff] rounded-[10px] py-2 font-bold text-white hover:opacity-70 cursor-pointer">
                        CADASTRAR
                    </button>

                    <div className="flex justify-center items-center">
                        <p className="text-[14px] text-[#71717A]">
                            Já possui uma conta? 
                            <Link to="/login" className="text-[#7f98faff] hover:opacity-70 font-bold"> Login</Link>
                        </p>
                    </div>
                    
                </form>

            </div>
        </div>
    )
}