import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StoreEntity } from '../classe/store.entity';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoreService {
  constructor(
    @InjectRepository(StoreEntity)
    private storeEntityRepository: Repository<StoreEntity>,
  ) {}
  async findOne(store_id: number): Promise<StoreEntity | null> {
    return this.storeEntityRepository.findOneBy({ store_id });
  }

  async create(createStoreDto: CreateStoreDto) {
    await this.storeEntityRepository.save(createStoreDto);
    return 'This action adds a new user';
  }

  findAll() {
    return this.storeEntityRepository.find();
  }
  async update(store_id: number, updateStoreDto: UpdateStoreDto) {
    await this.storeEntityRepository.update(store_id, updateStoreDto);
    return `This action updates a #${store_id} user`;
  }

  async remove(store_id: number) {
    await this.storeEntityRepository.delete(store_id);
    return `This action removes a #${store_id} user`;
  }
}
