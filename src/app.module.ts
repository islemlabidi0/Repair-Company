import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseService } from './database.service';
import { UserModule } from './User/user.module';
import { SparePartModule } from './sparepart/sparepart.module';
import { DeviceModule } from './device/device.module';
import { InterventionModule } from './intervention/intervention.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // Load .env file eli 7atina fih esem database , username , password , port ...
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // MySQL connection
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('DB_HOST'),
        port: Number(config.get('DB_PORT')),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, // 5tr a7na f dev donc n7otouha true , b3d ken production nbadlouha false
      }),
    }),
      UserModule,
      SparePartModule,
      DeviceModule,
      InterventionModule,
      AuthModule
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
