import { Entity, PrimaryGeneratedColumn, BaseEntity, Column, ManyToOne } from 'typeorm';
import { Recipe } from './recipe.entity';

@Entity()
export class IngredientGroup extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(type => Recipe, recipe => recipe.ingredient_groups, {eager: false})
  recipe: Recipe;

  @Column()
  recipe_id: number;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
