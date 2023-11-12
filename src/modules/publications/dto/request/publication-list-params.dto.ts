import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ParamsQueryDto } from '../../../../common/dto/params-query.dto';

export enum OrderEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum PublicationOrderFieldEnum {
  createdAt = 'createdAt',
  price = 'price',
  views = 'views',
}

export class PublicationListQuerytDto extends ParamsQueryDto {
  @IsEnum(OrderEnum)
  @IsOptional()
  order?: OrderEnum = OrderEnum.ASC;

  @IsEnum(PublicationOrderFieldEnum)
  @IsOptional()
  orderBy?: PublicationOrderFieldEnum = PublicationOrderFieldEnum.createdAt;

  @Transform(({ value }) => value.toLowerCase())
  @IsString()
  @IsOptional()
  search?: string;

  @IsOptional()
  date?: string;

  @IsOptional()
  startDate?: string;

  @IsOptional()
  endDate?: string;
}
