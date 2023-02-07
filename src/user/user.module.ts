import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from '../classe/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
