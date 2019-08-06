import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { RecipeStatus } from './recipe-status-enum';
import { User } from '../auth/user.entity';

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

    @Column('boolean')
    public: boolean;


}
