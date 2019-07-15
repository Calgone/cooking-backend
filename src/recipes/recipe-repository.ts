import { EntityRepository, Repository } from 'typeorm';
import { Recipe } from './recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe-dto';
import { RecipeStatus } from './recipe-status-enum';
import { GetRecipesFilterDto } from './dto/get-recipes-filter-dto';
import { User } from 'src/auth/user.entity';
import { Logger, InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Recipe)
export class RecipeRepository extends Repository<Recipe> {
    private logger = new Logger('RecipeRepository');

    async getRecipes(
        filterDto: GetRecipesFilterDto,
        user: User,
    ): Promise<Recipe[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('recipe');

        query.where('recipe.userId = :userId', {userId: user.id});

        if (status) {
            query.andWhere('recipe.status = :status', { status });
        }

        if (search) {
            query.andWhere('recipe.title LIKE :search OR recipe.description LIKE :search', { search: `%${search}%` });
        }
        try {
            const recipes = await query.getMany();
            return recipes;
        } catch (error) {
            this.logger.error(`Failed to get recipe for user ${user.username}, Filters: ${JSON.stringify(filterDto)}`, error.stack);
            throw new InternalServerErrorException();
        }
    }

    async createRecipe(
        createRecipeDto: CreateRecipeDto,
        user: User,
    ): Promise<Recipe> {
        const { title, description } = createRecipeDto;
        const recipe = new Recipe();
        recipe.title = title;
        recipe.description = description;
        recipe.status = RecipeStatus.OPEN;
        recipe.user = user;

        try {
        await recipe.save();
        } catch (error) {
            this.logger.error(`Failed to create recipe for user ${user.username}, Data: ${createRecipeDto}`, error.stack);
            throw new InternalServerErrorException();
        }

        delete recipe.user; // Pour ne pas renvoyer le user dans la réponse

        return recipe;
    }
}
