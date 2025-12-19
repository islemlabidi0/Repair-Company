import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SparePart } from './sparepart.entity';
import { SparePartService } from './sparepart.service';
import { SparePartController } from './sparepart.controller';


@Module({
  imports: [TypeOrmModule.forFeature([SparePart])],
  providers: [SparePartService],
  controllers: [SparePartController],
  exports: [],
})
export class SparePartModule {}
