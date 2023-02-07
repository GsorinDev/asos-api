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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategorySchema } from './category.schema';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto, @Headers() headers) {
    const role = JSON.parse(atob(headers.authorization.split('.')[1])).role;

    if (role !== 'store') {
      throw new BadRequestException("you don't have permission to access it");
    }
    const result = CategorySchema.validate(createCategoryDto);

    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.categoryService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() body: any, @Headers() headers) {
    const role = JSON.parse(atob(headers.authorization.split('.')[1])).role;

    if (role !== 'store') {
      throw new BadRequestException("you don't have permission to access it");
    }
    const result = CategorySchema.validate(body);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    await this.categoryService.update(id, body);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number, @Headers() headers) {
    const role = JSON.parse(atob(headers.authorization.split('.')[1])).role;

    if (role !== 'store') {
      throw new BadRequestException("you don't have permission to access it");
    }
    await this.categoryService.remove(id);
  }
}
