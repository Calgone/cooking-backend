import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Recipe } from '../recipes/recipe.entity';
import { UserTitle } from './user-title-enum';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    title: UserTitle;

    @Column()
    password: string;

    @Column()
    salt: string;

    @OneToMany(type => Recipe, recipe => recipe.user, { eager: true })
    recipes: Recipe[];

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}
