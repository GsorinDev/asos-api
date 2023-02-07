import { CategoryEntity } from '../../classe/category.entity';
import {StoreEntity} from "../../classe/store.entity";

export class CreateArticleDto {
  name: string;
  price: number;
  category: CategoryEntity;
  store: StoreEntity;
  image_link: string;
  description: string;
}
