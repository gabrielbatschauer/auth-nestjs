import {
  Controller,
  Post,
  Body,
  UsePipes,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserDto, CreateUserSchema } from './schema/create-user.schema';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { FindUserByEmailDto } from './schema/find-user-by-email.schema';
import { ChangeRoleDto, ChangeRoleSchema } from './schema/change-role.schema';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/decorators/roles.decoratos';

@ApiTags('Usuário')
@UseGuards(RoleGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post()
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  @ApiOperation({ summary: 'Cria um novo usuário' })
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('find')
  @ApiBearerAuth('jwt')
  @ApiOperation({
    summary: 'Acha o usuário pelo e-mail (usado para validação e login)',
  })
  @ApiBody({ type: FindUserByEmailDto })
  findByEmail(@Body('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Post('update/:id')
  @Roles('ADMIN')
  @ApiBearerAuth('jwt')
  @ApiBody({ type: ChangeRoleDto })
  changeRole(
    @Param('id') id: number,
    @Body(new ZodValidationPipe(ChangeRoleSchema)) changeRoleDto: ChangeRoleDto,
  ) {
    return this.userService.changeRole(+id, changeRoleDto);
  }
}
