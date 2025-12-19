import { DeviceService } from './device.service';
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { CreateDeviceDto } from './Dto/create-device.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/common/roles.decorator';

//lezm yebda user connected bch ynjm
@UseGuards(JwtAuthGuard)
@Controller('devices')
export class DeviceController {
    constructor(private readonly DeviceService: DeviceService) {}

    @Post()
    //@body to ready json body ml request 
    //createDeviceDto 5tr lezm lbody match the createDeviceDto
    create(@Body() CreateDeviceDto: CreateDeviceDto){
        return this.DeviceService.create(CreateDeviceDto);
    }

    @Get()
    getAll(){
        return this.DeviceService.getAll();
    }
    //ken l admin ynjm yfasa5 device
    @UseGuards(RolesGuard)
    @Roles('ADMIN')
    @Delete(':id')
    remove(@Param('id') id: number){
        return this.DeviceService.remove(id);
    }
    
}