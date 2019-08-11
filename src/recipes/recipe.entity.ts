import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { RecipeStatus } from './recipe-status-enum';
import { User } from '../auth/user.entity';
import { Step } from './step.entity';
import { IngredientGroup } from './ingredient-group.entity';

@Entity()
export class Recipe extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: RecipeStatus;

    @ManyToOne(type => User, user => user.recipes, { eager: false })
    user: User;

    @Column()
    userId: number;

    @OneToMany(type => IngredientGroup, ingredient_group => ingredient_group.recipe_id, {eager: true})
    ingredient_groups: IngredientGroup[];

    @Column('boolean')
    public: boolean;

    @OneToMany(type => Step, step => step.recipe, { eager: true })
    steps: Step[];
    
    @Column()
    servings: number;

    @Column()
    prep_minutes: number;

    @Column()
    cook_minutes: number;

    @Column()
    rest_minutes: number;

    @Column()
    difficulty: number;

    @Column()
    img_path: string;

    @Column()
    created_at: Date;

    @Column()
    updated_at: Date;

}
