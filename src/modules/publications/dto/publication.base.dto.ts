// publication.dto.ts
import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsArray,
  ArrayMinSize,
  IsDate,
  IsOptional,
  IsEnum,
  Min,
} from 'class-validator';
import { Currency } from '../../../common/enum/currency.enum';
import { CarBrand } from '../../../common/enum/carBrand.enum';
import { CarModel } from '../../../common/enum/carModel.enum';
import { ImageEntity } from '../../image/entities/image.entity';

export class PublicationBaseDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(Currency)
  currency: Currency;

  @IsInt()
  @IsNotEmpty()
  @Min(1, { message: 'Price should be greater than or equal to 1.' })
  price: number;

  @IsArray()
  @ArrayMinSize(1, { message: 'At least one image is required.' })
  images: ImageEntity[];

  @IsArray()
  @IsDate({ each: true, message: 'Each view should be a valid date.' })
  views: Date[];

  @IsEnum(CarBrand)
  brand: CarBrand;

  @IsEnum(CarModel)
  model: CarModel;

  @IsOptional()
  @IsString()
  modelOther?: string;

  @IsOptional()
  @IsString()
  brandOther?: string;
}
