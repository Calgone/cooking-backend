import { Injectable, NotFoundException } from '@nestjs/common';
import { RecipeStatus } from './recipe-status-enum';
// import * as uuid from 'uuid/v1';
import { CreateRecipeDto } from './dto/create-recipe-dto';
import { GetRecipesFilterDto } from './dto/get-recipes-filter-dto';

@Injectable()
export class RecipesService {
    // private recipes: Recipe[] = [];

    // getAllRecipes(): Recipe[] {
    //     return this.recipes;
    // }

    // getRecipesWithFilters(filterDto: GetRecipesFilterDto): Recipe[] {
    //     const { status, search } = filterDto;
    //     let recipes = this.getAllRecipes();

    //     if (status) {
    //         recipes = recipes.filter(recipe => recipe.status === status);
    //     }

    //     if (search) {
    //         recipes = recipes.filter(recipe =>
    //             recipe.title.includes(search) ||
    //             recipe.description.includes(search)
    //         );
    //     }
    //     return recipes;
    // }

    // getRecipeById(id: string): Recipe {
    //     const found = this.recipes.find(recipe => recipe.id === id);
    //     if (!found) {
    //         throw new NotFoundException(`Recipe with id "${id}" not found`);
    //     } else {
    //         return found;
    //     }
    // }

    // createRecipe(createRecipeDto: CreateRecipeDto): Recipe {
    //     const { title, description } = createRecipeDto;

    //     const recipe: Recipe = {
    //         id: uuid(),
    //         title,
    //         description,
    //         status: RecipeStatus.OPEN,
    //     };
    //     this.recipes.push(recipe);
    //     return recipe;
    // }

    // deleteRecipe(id: string): void {
    //     const found = this.getRecipeById(id);

    //     this.recipes = this.recipes.filter(recipe => recipe.id !== found.id);
    // }

    // updateRecipeStatus(id: string, status: RecipeStatus): Recipe {
    //     const recipe = this.getRecipeById(id);
    //     recipe.status = status;
    //     return recipe;
    // }
}
