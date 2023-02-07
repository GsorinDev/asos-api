import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ArticleEntity } from './article.entity';
@Entity()
export class StoreEntity {
  @PrimaryGeneratedColumn()
  store_id: number;

  @Column()
  name: string;

  @OneToMany(() => ArticleEntity, (article) => article.store)
  articles: ArticleEntity[];
}
