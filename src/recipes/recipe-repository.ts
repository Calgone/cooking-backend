import { EntityRepository, Repository } from 'typeorm';
import { Recipe } from './recipe.entity';

@EntityRepository(Recipe)
export class RecipeRepository extends Repository<Recipe> {
    
}
