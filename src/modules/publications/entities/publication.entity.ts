import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreatedUpdatedModel } from '../../../common/entities/create-update.model';
import { UserEntity } from '../../users/entities/user.entity';
import { ImageEntity } from '../../image/entities/image.entity';
import { Currency } from '../../../common/enum/currency.enum';
import { CarBrand } from '../../../common/enum/carBrand.enum';
import { CarModel } from '../../../common/enum/carModel.enum';
import { ChangeMany } from '../../../common/enum/changeMany.enum';
import { RegionEnum } from '../../../common/enum/region.enum';

@Entity('publications')
export class PublicationEntity extends CreatedUpdatedModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'int' })
  price: number;

  @ManyToOne(() => UserEntity, (user) => user.publications, {
    nullable: true,
  })
  user: UserEntity;

  @OneToMany(() => ImageEntity, (image) => image.publication)
  images: ImageEntity[];

  @Column({ type: 'timestamp with time zone', array: true, default: '{}' })
  views: Date[];

  @Column({ type: 'enum', enum: Currency })
  currency: Currency;

  @Column({ type: 'float' })
  exchangeRate: number;

  @Column({ type: 'float', nullable: true })
  priceUsd: number;

  @Column({ type: 'float', nullable: true })
  priceEur: number;

  @Column({ type: 'float', nullable: true })
  priceUah: number;

  @Column({ type: 'enum', enum: CarBrand, default: CarBrand.BMW })
  brand: CarBrand;

  @Column({ type: 'enum', enum: CarModel, default: CarModel.X5 })
  model: CarModel;

  @Column({ type: 'enum', enum: RegionEnum, default: RegionEnum.Lviv })
  regionCar: RegionEnum;

  // Логіка перед збереженням, яка встановлює обмінний курс та ціни в різних валютах
  @BeforeInsert()
  setExchangeRateAndPrices() {
    switch (this.currency) {
      case Currency.UAH:
        this.exchangeRate = ChangeMany.UAH;
        this.priceUsd = this.price / ChangeMany.USD;
        this.priceEur = this.price / ChangeMany.EUR;
        this.priceUah = this.price;
        break;
      case Currency.USD:
        this.exchangeRate = ChangeMany.USD;
        this.priceUsd = this.price;
        this.priceUah = ChangeMany.USD * this.price;
        this.priceEur = this.priceUah / ChangeMany.EUR;
        break;
      case Currency.EUR:
        this.exchangeRate = ChangeMany.EUR;
        this.priceEur = this.price;
        this.priceUah = ChangeMany.EUR * this.price;
        this.priceUsd = this.priceUah / ChangeMany.USD;
        break;
      // Додайте інші кейси за потребою
      default:
        // Значення за замовчуванням, якщо не знайдено відповідного курсу
        this.exchangeRate = 1.0;
        this.priceUsd = this.price;
        this.priceEur = this.price;
        this.priceUah = this.price;
        break;
    }
  }
}
