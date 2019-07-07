import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { RecipeStatus } from './recipe-status-enum';

@Entity()
export class Recipe extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    recipeStatus: RecipeStatus;
}
