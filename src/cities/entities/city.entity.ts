import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'cities',
})
export class CityEntity {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'integer',
  })
  id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    name: 'description',
    type: 'text',
    nullable: false,
  })
  description: string;

  @Column({
    name: 'is_default',
    type: 'boolean',
    default: true,
  })
  isDefault: boolean;
}
