import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SparePart } from './sparepart.entity';


@Module({
  imports: [TypeOrmModule.forFeature([SparePart])],
  providers: [],
  controllers: [],
  exports: [],
})
export class SparePartModule {}
