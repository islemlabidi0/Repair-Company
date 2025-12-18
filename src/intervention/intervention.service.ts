import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Intervention } from "./intervention.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { CreateInterventionDto } from "./Dto/create-intervention.dto";
import { User } from "src/User/user.entity";
import { Device, DeviceStatus } from "src/device/device.entity";
import { SparePart } from "src/sparepart/sparepart.entity";

@Injectable()
export class InterventionService{
    constructor(
        @InjectRepository(Intervention)
        //nestJS ya3ml intervention repository w yconnectiha b intervention table fi mysql
        private readonly InterventionRepository: Repository<Intervention>,
        private readonly datasource: DataSource
    ){}

    async create(
        dto: CreateInterventionDto,
        technicien: User,
    ){
        //nest3mlou transaction 5tr 3ana barcha ops(stock update , device status, intervention creation) donc ken wa7da fihom fails , the database must rollback to avoid corruption
        return this.datasource.transaction(async manager =>{
            const technicienEntity = await manager.findOne(User, {
                where: {id: technicien.id}
            });

            //nchoufou device mawjouda fl DB wale
            const device = await manager.findOne(Device,{where: { id: dto.deviceId},});

            if(!device){
                throw new NotFoundException('Device not found');
            }

            //nchoufou spare partsmawjoudin wale
            const spareParts = await manager.findByIds(
                SparePart,
                dto.SparePartIds
            );

            if(spareParts.length !== dto.SparePartIds.length){
                throw new BadRequestException('Invalid spare parts');
            }

            //nchoufou ken stock yzazi
            for (const part of spareParts){
                if(part.stock <= 0){
                    throw new BadRequestException(`Spare part ${part.name} out of stock`);
                }
            }

            //ken kol chy mrigl donc ndecrementiw stock 
            for (const part of spareParts){
                part.stock -= 1;
                await manager.save(part);
            }

            //update device status
            device.status = DeviceStatus.REPAIRING;
            await manager.save(device);

            //create intervention
            const intervention = manager.create(Intervention,{
                date: new Date(),
                description: dto.description,
                device,
                technician: technicienEntity,
                spareParts
            });

            await manager.save(intervention);

            return {
                message: 'Intervention created successfully',
                intervention
            };
        });
    }
}