import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Intervention } from './intervention.entity';
import { UserModule } from 'src/User/user.module';
import { SparePartModule } from 'src/sparepart/sparepart.module';
import { DeviceModule } from 'src/device/device.module';
import { InterventionService } from './intervention.service';
import { InterventionController } from './intervention.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Intervention]),
    UserModule,
    DeviceModule,
    SparePartModule,
  ],
  providers: [InterventionService],
  controllers: [InterventionController],
  exports: [],
})
export class InterventionModule {}
