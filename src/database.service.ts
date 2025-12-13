import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';
//bch tekaadou ken connection with database mrigla
@Injectable()
export class DatabaseService implements OnModuleInit {
  constructor(private readonly dataSource: DataSource) {}

  async onModuleInit() {
    try {
      await this.dataSource.query('SELECT 1');
      console.log('MySQL connection successful');
    } catch (error) {
      console.error(' MySQL connection failed', error);
    }
  }
}
