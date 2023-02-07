import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { StoreController } from './store/store.controller';
import { StoreModule } from './store/store.module';
import { ArticleService } from './article/article.service';
import { ArticleController } from './article/article.controller';
import { ArticleModule } from './article/article.module';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './classe/user.entity';
import { StoreEntity } from './classe/store.entity';
import { ArticleEntity } from './classe/article.entity';
import { CategoryEntity } from './classe/category.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'db',
      entities: [UserEntity, StoreEntity, ArticleEntity, CategoryEntity],
      synchronize: true,
    }),
    UserModule,
    StoreModule,
    ArticleModule,
    CategoryModule,
    AuthModule,
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([StoreEntity]),
    TypeOrmModule.forFeature([CategoryEntity]),
    TypeOrmModule.forFeature([ArticleEntity]),
  ],
  controllers: [
    AppController,
    UserController,
    StoreController,
    ArticleController,
  ],
  providers: [AppService, UserService, ArticleService],
})
export class AppModule {}
