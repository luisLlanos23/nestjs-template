import { Column, Entity } from 'typeorm';
import { USERS_ENTITY } from 'src/api/users/dto/user.dto';
import { Base } from 'src/base/base.entity';

@Entity(USERS_ENTITY)
export class UsersEntity extends Base {
  @Column('varchar', { nullable: false })
  name: string;
  @Column('varchar', { nullable: true })
  lastName: string;
  @Column('varchar', { nullable: false, unique: true })
  email: string;
  @Column('varchar', { nullable: false })
  password: string;
  @Column('boolean', { nullable: false, default: false })
  isAdmin: boolean;
  @Column('timestamp' , { nullable: true })
  tokenExpiration: Date;
}