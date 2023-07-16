import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import database from './database/database';
import { DataSource } from 'typeorm';
import { PersonModule } from './User/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    database,
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
