import { z } from 'zod';
import { createZodDto } from '@anatine/zod-nestjs';
import { TipoUsuario } from 'generated/prisma';

export const ChangeRoleSchema = z.object({
  tipoUsuario: z.nativeEnum(TipoUsuario),
});

export class ChangeRoleDto extends createZodDto(ChangeRoleSchema) {}
