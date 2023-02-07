import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {Role} from '../role/role.enum';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  mail: string;

  @Column()
  pseudo: string;

  @Column()
  password: string;

  @Column({ default: Role.User })
  role: Role;
}
