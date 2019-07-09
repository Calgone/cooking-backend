import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipeStatus } from './recipe-status-enum';
import { CreateRecipeDto } from './dto/create-recipe-dto';
import { GetRecipesFilterDto } from './dto/get-recipes-filter-dto';
import { RecipeStatusValidationPipe } from './pipes/recipe-status-validation-pipe';
import { Recipe } from './recipe.entity';

@Controller('recipes')
export class RecipesController {
    constructor(private recipesService: RecipesService) { }

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetRecipesFilterDto): Promise<Recipe[]> {
        return this.recipesService.getRecipes(filterDto);
    }

    @Get('/:id')
    getRecipeById(@Param('id', ParseIntPipe) id: number): Promise<Recipe> {
        return this.recipesService.getRecipeById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createRecipe(
        @Body() createRecipeDto: CreateRecipeDto): Promise<Recipe> {
        return this.recipesService.createRecipe(createRecipeDto);
    }

    @Delete('/:id')
    deleteRecipe(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.recipesService.deleteRecipe(id);
    }

    @Patch('/:id/status')
    updateRecipeStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', RecipeStatusValidationPipe) status: RecipeStatus): Promise<Recipe> {
        return this.recipesService.updateRecipeStatus(id, status);
    }
}
