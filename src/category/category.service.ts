import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreEntity } from '../classe/store.entity';
import { Repository } from 'typeorm';
import { CreateStoreDto } from '../store/dto/create-store.dto';
import { UpdateStoreDto } from '../store/dto/update-store.dto';
import { CategoryEntity } from '../classe/category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryEntityRepository: Repository<CategoryEntity>,
  ) {}
  async findOne(category_id: number): Promise<CategoryEntity | null> {
    return this.categoryEntityRepository.findOneBy({ category_id });
  }

  async create(createCategoryDto: CreateCategoryDto) {
    await this.categoryEntityRepository.save(createCategoryDto);
    return 'This action adds a new user';
  }

  findAll() {
    return this.categoryEntityRepository.find();
  }
  async update(category_id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.categoryEntityRepository.update(category_id, updateCategoryDto);
    return `This action updates a #${category_id} user`;
  }

  async remove(category_id: number) {
    await this.categoryEntityRepository.delete(category_id);
    return `This action removes a #${category_id} user`;
  }
}
