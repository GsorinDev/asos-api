import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { StoreSchema } from './store.schema';
import { JwtAuthGuard } from '../auth/jwt-auth-guard';

@Controller('store')
export class StoreController {
  constructor(private storeService: StoreService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createStoreDto: CreateStoreDto, @Headers() headers) {
    const role = JSON.parse(atob(headers.authorization.split('.')[1])).role;

    if (role !== 'store') {
      throw new BadRequestException("you don't have permission to access it");
    }
    const result = StoreSchema.validate(createStoreDto);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return this.storeService.create(createStoreDto);
  }

  @Get()
  findAll() {
    return this.storeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.storeService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() body: any, @Headers() headers) {
    const role = JSON.parse(atob(headers.authorization.split('.')[1])).role;

    if (role !== 'store') {
      throw new BadRequestException("you don't have permission to access it");
    }
    const result = StoreSchema.validate(body);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    await this.storeService.update(id, body);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number, @Headers() headers) {
    const role = JSON.parse(atob(headers.authorization.split('.')[1])).role;

    if (role !== 'store') {
      throw new BadRequestException("you don't have permission to access it");
    }
    await this.storeService.remove(id);
  }
}
