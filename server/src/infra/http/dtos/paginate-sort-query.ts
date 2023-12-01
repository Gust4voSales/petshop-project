import { SortOrder } from "@app/repositories/utils/sort";
import { IsIn, IsOptional, IsPositive, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from "class-validator";
import { Type } from "class-transformer";

const SORT_OPTIONS: [SortOrder, SortOrder] = ['asc', 'desc'];

@ValidatorConstraint({ name: 'definedWithSortBy', async: false })
export class DefinedWithSortByConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const sortBy = (args.object as any)['sortBy']

    if (!sortBy && value) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'if sortOrder is provided, sortBy must also be provided.';
  }
}

function DefinedWithSortBy(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: DefinedWithSortByConstraint,
    });
  };
}

export class PaginateSortQuery {
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  page?: number

  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  pageSize?: number

  // sortBy should be defined by the QueryDTO, with the valid options

  @IsOptional()
  @DefinedWithSortBy() // custom decorator that checks if sortOrder and sortBy are both defined when sortOrder is defined
  @IsIn(SORT_OPTIONS)
  sortOrder?: SortOrder;
}