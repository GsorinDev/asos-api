import { PartialType } from '@nestjs/mapped-types';
import { CreateArticleDto } from './create-article.dto';
import { CategoryEntity } from '../../classe/category.entity';
import {StoreEntity} from "../../classe/store.entity";

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  name: string;
  price: number;
  category: CategoryEntity;
  store: StoreEntity;
  image_link: string;
  description: string;
}
