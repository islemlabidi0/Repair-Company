import { Controller, Get, Post, Patch, Delete, Body, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { SparePartService } from './sparepart.service';
import { CreateSparePartDto } from './dto/create-sparepart.dto';
import { UpdateSparePartDto } from './dto/update-sparepart.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../common/roles.decorator';


@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('spareparts')
export class SparePartController {
  constructor(private readonly service: SparePartService) {}

  @Roles('ADMIN')
  @Post()
  create(@Body() dto: CreateSparePartDto) {
    return this.service.create(dto);
  }

  @Roles('ADMIN' , 'TECH')
  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Roles('ADMIN', 'TECH')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Roles('ADMIN')
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateSparePartDto) {
    return this.service.update(id, dto);
  }

  @Roles('ADMIN')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }

  
}
