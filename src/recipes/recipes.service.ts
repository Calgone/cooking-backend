import { Injectable, NotFoundException } from '@nestjs/common';
import { RecipeStatus } from './recipe-status-enum';
// import * as uuid from 'uuid/v1';
import { CreateRecipeDto } from './dto/create-recipe-dto';
import { GetRecipesFilterDto } from './dto/get-recipes-filter-dto';
import { RecipeRepository } from './recipe-repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class RecipesService {
    // private recipes: Recipe[] = [];
    constructor(
        @InjectRepository(RecipeRepository)
        private recipeRepository: RecipeRepository,
    ) {

    }

    async getRecipes(
        filterDto: GetRecipesFilterDto,
        user: User,
    ): Promise<Recipe[]> {
        return this.recipeRepository.getRecipes(filterDto, user);
    }

    async getAllRecipes(
        filterDto: GetRecipesFilterDto,
    ): Promise<Recipe[]> {
        return this.recipeRepository.getAllRecipes(filterDto);
    }

    async getRecipeById(
        id: number, user: User): Promise<Recipe> {
        const found = await this.recipeRepository.findOne({ where: { id, userId: user.id } });
        if (!found) {
            throw new NotFoundException(`Recipe with id "${id}" not found`);
        }
        return found;
    }

    async createRecipe(
        createRecipeDto: CreateRecipeDto,
        user: User,
    ): Promise<Recipe> {
        return this.recipeRepository.createRecipe(createRecipeDto, user);
    }

    async deleteRecipe(
        id: number,
        user: User,
    ): Promise<void> {
        const result = await this.recipeRepository.delete({id, userId: user.id});
        if (result.affected === 0) {
            throw new NotFoundException(`Recipe with id "${id}" not found`);
        }
    }

    async updateRecipeStatus(
        id: number,
        status: RecipeStatus,
        user: User,
    ): Promise<Recipe> {
        const recipe = await this.getRecipeById(id, user);
        recipe.status = status;
        await recipe.save();
        return recipe;
    }
}
