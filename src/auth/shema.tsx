import { z } from 'zod';

export const createUserSchema = z.object({
    email: z
        .string()
        .email('Email inválido')
        .nonempty('Email é obrigatório'),
    name: z
        .string()
        .nonempty('Nome é obrigatório'),
    password: z
        .string()
        .nonempty('Senha é obrigatória')
        .min(6, 'Senha deve ter no mínimo 6 caracteres'),
    cpf: z
        .string()
        .nonempty('CPF é obrigatório')
        .min(11, 'CPF deve ter no mínimo 11 caracteres')
        .regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, 'CPF inválido'),
    phone: z
        .string()
        .nonempty('Telefone é obrigatório')
        .min(11, 'Telefone é obrigatório')
        .regex(/^\(\d{2}\)\s\d{4,5}\-\d{4}$/, 'Telefone inválido'),
    cep: z
        .string()
        .nonempty('CEP é obrigatório')
        .min(8, 'CEP é obrigatório')
        .regex(/^\d{5}\-\d{3}$/, 'CEP inválido'),
    city: z
        .string()
        .nonempty('Digite um CEP válido'),
})
