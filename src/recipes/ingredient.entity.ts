import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm';

Entity();
export class Ingredient extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ingredient_group_id: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
