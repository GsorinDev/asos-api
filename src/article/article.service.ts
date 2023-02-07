import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleEntity } from '../classe/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private articleEntityRepository: Repository<ArticleEntity>,
  ) {}
  async findOne(article_id: number): Promise<ArticleEntity> {
    return this.articleEntityRepository.findOne({
      relations: ['store', 'category'],
      where: { article_id },
    });
  }

  async create(createArticleDto: CreateArticleDto) {
    await this.articleEntityRepository.save(createArticleDto);
    return 'This action adds a new user';
  }

  findAll() {
    return this.articleEntityRepository.find({
      relations: ['store', 'category'],
    });
  }
  async update(article_id: number, updateArticleDto: UpdateArticleDto) {
    await this.articleEntityRepository.update(article_id, updateArticleDto);
    return `This action updates a #${article_id} user`;
  }

  async remove(article_id: number) {
    await this.articleEntityRepository.delete(article_id);
    return `This action removes a #${article_id} user`;
  }
}
