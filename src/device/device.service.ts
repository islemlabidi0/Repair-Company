import { CreateDeviceDto } from './Dto/create-device.dto';
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Device } from "./device.entity";

@Injectable()
export class DeviceService {
    constructor(
        @InjectRepository(Device)
        //nestJS ya3ml device repository w yconnectiha b device table fi mysql
        private readonly deviceRepository: Repository<Device>,
    ){}

    async create(CreateDeviceDto: CreateDeviceDto): Promise<Device> {
        //nchoufou ken l device déjà mawjouda fl database
        const existing = await this.deviceRepository.findOne({
            where: { serialNumber: CreateDeviceDto.serialNumber},
        });
    
    //ken mawjouda t5arej exception
    if(existing){
        throw new BadRequestException('Device with this serial number already exists');
    }
    //sinon tzid device fl base
    const device = this.deviceRepository.create(CreateDeviceDto);
    return this.deviceRepository.save(device);
    }

    //pour afficher tous les devices
    async getAll(): Promise<Device[]> {
        return this.deviceRepository.find();
    }

    //just l admin ynjm ysafa5 device
    async remove(id: number): Promise<{message: string}>{
        const device = await this.deviceRepository.findOne({where: { id }});
        //netaakdou ken device mawjouda 
        if(!device){
            throw new NotFoundException(`Device with ID ${id} not found`);
        }
        //nfas5ou device ml base
        await this.deviceRepository.delete(id);

        return{ message: `Device with ID ${id} deleted successfully`};
    }
}