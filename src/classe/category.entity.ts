import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import {ArticleEntity} from "./article.entity";
@Entity()
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column()
  libelle: string;

  @OneToMany(() => ArticleEntity, (article) => article.category)
  articles: ArticleEntity[];
}
