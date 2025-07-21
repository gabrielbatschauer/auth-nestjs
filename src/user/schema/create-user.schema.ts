import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';
import { TipoUsuario } from 'generated/prisma';

export const CreateUserSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha mínima de 6 caracteres'),
  tipoUsuario: z.nativeEnum(TipoUsuario).optional(),
});

export class CreateUserDto extends createZodDto(CreateUserSchema) {}
