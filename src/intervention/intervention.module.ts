import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Intervention } from './intervention.entity';
import { UserModule } from 'src/User/user.module';
import { SparePartModule } from 'src/sparepart/sparepart.module';
import { DeviceModule } from 'src/device/device.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Intervention]),
    UserModule,
    DeviceModule,
    SparePartModule,
  ],
  providers: [],
  controllers: [],
  exports: [],
})
export class InterventionModule {}
