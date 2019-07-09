import { PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { RecipeStatus } from '../recipe-status-enum';

export class RecipeStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        RecipeStatus.OPEN,
        RecipeStatus.IN_PROGRESS,
        RecipeStatus.DONE,
    ];

    transform(value: any, metadata: ArgumentMetadata) {
        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} is an invalid status`);
        }

        return value;
    }

    private isStatusValid(status: any) {
        const idx = this.allowedStatuses.indexOf(status);
        // console.log('idx', idx);
        return idx !== -1;
    }
}