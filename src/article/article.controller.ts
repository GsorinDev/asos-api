import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticleSchema } from './article.schema';
import { CategoryService } from '../category/category.service';
import { StoreService } from '../store/store.service';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';

@Controller('article')
export class ArticleController {
  constructor(
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private storeService: StoreService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createArticleDto: CreateArticleDto, @Headers() headers) {
    const role = JSON.parse(atob(headers.authorization.split('.')[1])).role;

    if (role !== 'store') {
      throw new BadRequestException("you don't have permission to access it");
    }
    const result = ArticleSchema.validate(createArticleDto);
    const category_id = createArticleDto.category.category_id;
    const store_id = createArticleDto.store.store_id;

    const category = await this.categoryService.findOne(category_id);

    const store = await this.storeService.findOne(store_id);

    if (category === null) {
      throw new BadRequestException('category not exist');
    }

    if (store === null) {
      throw new BadRequestException('store not exist');
    }

    const article = {
      name: createArticleDto.name,
      price: createArticleDto.price,
      category: category,
      store: store,
      image_link: createArticleDto.image_link,
      description: createArticleDto.description,
    };

    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return this.articleService.create(article);
  }

  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.articleService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() body: any, @Headers() headers) {
    const role = JSON.parse(atob(headers.authorization.split('.')[1])).role;

    if (role !== 'store') {
      throw new BadRequestException("you don't have permission to access it");
    }
    const result = ArticleSchema.validate(body);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    await this.articleService.update(id, body);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number, @Headers() headers) {
    const role = JSON.parse(atob(headers.authorization.split('.')[1])).role;

    if (role !== 'store') {
      throw new BadRequestException("you don't have permission to access it");
    }
    await this.articleService.remove(id);
  }
}
