import { RecipeStatus } from '../recipe-status-enum';
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';

export class GetRecipesFilterDto {
    @IsOptional()
    @IsIn([RecipeStatus.OPEN, RecipeStatus.IN_PROGRESS, RecipeStatus.DONE])
    status: RecipeStatus;

    @IsOptional()
    @IsNotEmpty()
    search: string;
}
