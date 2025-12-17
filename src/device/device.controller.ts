import { DeviceService } from './device.service';
import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CreateDeviceDto } from './Dto/create-device.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

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
}