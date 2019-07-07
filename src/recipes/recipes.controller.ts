import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipeStatus } from './recipe-status-enum';
import { CreateRecipeDto } from './dto/create-recipe-dto';
import { GetRecipesFilterDto } from './dto/get-recipes-filter-dto';
import { RecipeStatusValidationPipe } from './pipes/recipe-status-validation-pipe';

@Controller('recipes')
export class RecipesController {
    constructor(private recipesService: RecipesService) { }

    // @Get()
    // getTasks(@Query(ValidationPipe) filterDto: GetRecipesFilterDto): Recipe[] {
    //     if (Object.keys(filterDto).length) {
    //         return this.recipesService.getRecipesWithFilters(filterDto);
    //     } else {
    //         return this.recipesService.getAllRecipes();
    //     }
    // }

    // @Get('/:id')
    // getRecipeById(@Param('id') id: string): Recipe {
    //     return this.recipesService.getRecipeById(id);
    // }

    // @Post()
    // @UsePipes(ValidationPipe)
    // createRecipe(
    //     @Body() createRecipeDto: CreateRecipeDto): Recipe {
    //     return this.recipesService.createRecipe(createRecipeDto);
    // }

    // @Delete('/:id')
    // deleteRecipe(@Param('id') id: string) {
    //     this.recipesService.deleteRecipe(id);
    // }

    // @Patch('/:id/status')
    // updateRecipeStatus(
    //     @Param('id') id: string,
    //     @Body('status', RecipeStatusValidationPipe) status: RecipeStatus): Recipe {
    //     return this.recipesService.updateRecipeStatus(id, status);
    // }
}
