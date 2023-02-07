import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from '../classe/article.entity';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { CategoryService } from '../category/category.service';
import { CategoryEntity } from '../classe/category.entity';
import { StoreEntity } from '../classe/store.entity';
import { StoreService } from '../store/store.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ArticleEntity]),
    TypeOrmModule.forFeature([CategoryEntity]),
    TypeOrmModule.forFeature([StoreEntity]),
  ],
  providers: [ArticleService, CategoryService, StoreService],
  controllers: [ArticleController],
  exports: [ArticleService],
})
export class ArticleModule {}
