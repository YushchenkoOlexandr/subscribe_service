import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getOne(@Param() params): Promise<UserEntity> {
    return this.userService.getById(params.id);
  }

  @Post('/create')
  createUser(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    console.log(createUserDto);

    return this.userService.createUser(createUserDto);
  }
}
