// publication.dto.ts
import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsOptional,
  IsEnum,
  Min,
} from 'class-validator';
import { CarBrand } from '../../../../common/enum/carBrand.enum';
import { CarModel } from '../../../../common/enum/carModel.enum';

export class UpdatePublicationDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  @Min(1, { message: 'Price should be greater than or equal to 1.' })
  price?: number;

  @IsOptional()
  @IsEnum(CarBrand)
  brand?: CarBrand;

  @IsOptional()
  @IsEnum(CarModel)
  model?: CarModel;

  @IsOptional()
  @IsOptional()
  @IsString()
  modelOther?: string;

  @IsOptional()
  @IsOptional()
  @IsString()
  brandOther?: string;
}
