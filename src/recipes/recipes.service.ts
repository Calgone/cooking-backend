import { Injectable, NotFoundException } from '@nestjs/common';
import { RecipeStatus } from './recipe-status-enum';
// import * as uuid from 'uuid/v1';
import { CreateRecipeDto } from './dto/create-recipe-dto';
import { GetRecipesFilterDto } from './dto/get-recipes-filter-dto';
import { RecipeRepository } from './recipe-repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Recipe } from './recipe.entity';

@Injectable()
export class RecipesService {
    // private recipes: Recipe[] = [];
    constructor(
        @InjectRepository(RecipeRepository)
        private recipeRepository: RecipeRepository,
    ) {

    }

    async getRecipes(filterDto: GetRecipesFilterDto): Promise<Recipe[]> {
        return this.recipeRepository.getRecipes(filterDto);
    }

    async getRecipeById(id: number): Promise<Recipe> {
        const found = await this.recipeRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Recipe with id "${id}" not found`);
        }
        return found;
    }

    async createRecipe(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
        return this.recipeRepository.createRecipe(createRecipeDto);
    }

    async deleteRecipe(id: number): Promise<void> {
        const result = await this.recipeRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Recipe with id "${id}" not found`);
        }
    }

    async updateRecipeStatus(id: number, status: RecipeStatus): Promise<Recipe> {
        const recipe = await this.getRecipeById(id);
        recipe.status = status;
        await recipe.save();
        return recipe;
    }
}
