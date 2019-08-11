import { Entity, BaseEntity, PrimaryGeneratedColumn, OneToMany, Column, ManyToOne } from "typeorm";
import { Recipe } from './recipe.entity';

@Entity()
export class Step extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => Recipe, recipe => recipe.steps, {eager: false})
    recipe: Recipe;

    @Column()
    recipe_id: number;
    
    @Column()
    description: string;

    @Column()
    order: number;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

}