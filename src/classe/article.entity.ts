import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { StoreEntity } from './store.entity';
import { CategoryEntity } from './category.entity';
@Entity()
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  article_id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  image_link: string;

  @ManyToOne(() => StoreEntity, (store) => store.articles, { cascade: true })
  @JoinColumn()
  store: StoreEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.articles, {
    cascade: true,
  })
  @JoinColumn()
  category: CategoryEntity;
}
