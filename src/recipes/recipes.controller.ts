import { Controller, Get, Post, Body, Param, Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards, Logger } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { RecipeStatus } from './recipe-status-enum';
import { CreateRecipeDto } from './dto/create-recipe-dto';
import { GetRecipesFilterDto } from './dto/get-recipes-filter-dto';
import { RecipeStatusValidationPipe } from './pipes/recipe-status-validation-pipe';
import { Recipe } from './recipe.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user-decorator';

@Controller('recipes')
@UseGuards(AuthGuard())
export class RecipesController {
    private logger = new Logger('RecipesController');

    constructor(private recipesService: RecipesService) { }

    @Get()
    getTasks(
        @Query(ValidationPipe) filterDto: GetRecipesFilterDto,
        @GetUser() user: User,
    ): Promise<Recipe[]> {
        this.logger.verbose(`User ${user.username} retrieving all recipes. Filters : ${JSON.stringify(filterDto)}`);
        return this.recipesService.getRecipes(filterDto, user);
    }

    @Get('/:id')
    getRecipeById(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<Recipe> {
        return this.recipesService.getRecipeById(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createRecipe(
        @Body() createRecipeDto: CreateRecipeDto,
        @GetUser() user: User): Promise<Recipe> {
        this.logger.verbose(`User ${user.username} creating a new task. Data: ${JSON.stringify(createRecipeDto)}`);
        return this.recipesService.createRecipe(createRecipeDto, user);
    }

    @Delete('/:id')
    deleteRecipe(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ): Promise<void> {
        return this.recipesService.deleteRecipe(id, user);
    }

    @Patch('/:id/status')
    updateRecipeStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', RecipeStatusValidationPipe) status: RecipeStatus,
        @GetUser() user: User,
    ): Promise<Recipe> {
        return this.recipesService.updateRecipeStatus(id, status, user);
    }
}
