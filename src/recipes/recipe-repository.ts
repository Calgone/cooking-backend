import { EntityRepository, Repository } from 'typeorm';
import { Recipe } from './recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe-dto';
import { RecipeStatus } from './recipe-status-enum';
import { GetRecipesFilterDto } from './dto/get-recipes-filter-dto';

@EntityRepository(Recipe)
export class RecipeRepository extends Repository<Recipe> {

    async getRecipes(filterDto: GetRecipesFilterDto): Promise<Recipe[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('recipe');

        if (status) {
            query.andWhere('recipe.status = :status', {status});
        }

        if (search) {
            query.andWhere('recipe.title LIKE :search OR recipe.description LIKE :search', {search: `%${search}%`});
        }
        const recipes = await query.getMany();
        return recipes;
    }

    async createRecipe(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
        const { title, description } = createRecipeDto;
        const recipe = new Recipe();
        recipe.title = title;
        recipe.description = description;
        recipe.status = RecipeStatus.OPEN;
        await recipe.save();
        return recipe;
    }
}
