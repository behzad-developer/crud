import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

@Entity({
  name: 'permissions',
})
export class PermissionEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'integer',
  })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: '50',
    nullable: false,
    unique: true,
  })
  name: string;

  @ManyToMany(() => UserEntity, (user) => user.permissions)
  users: UserEntity[];

  constructor(permission?: Partial<PermissionEntity>) {
    Object.assign(this, permission);
  }
}
