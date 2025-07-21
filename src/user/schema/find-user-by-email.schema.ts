// Utilizado pelo zod para validação de criação de usuários
import { createZodDto } from '@anatine/zod-nestjs';
import { z } from 'zod';

export const FindUserByEmailSchema = z.object({
  email: z.string().email('E-mail inválido'),
});

export class FindUserByEmailDto extends createZodDto(FindUserByEmailSchema) {}
