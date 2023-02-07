import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserSchema } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const result = UserSchema.validate(createUserDto);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }

    const saltOrRounds = await bcrypt.genSalt();

    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      saltOrRounds,
    );
    return this.userService.create(createUserDto);
  }
}
