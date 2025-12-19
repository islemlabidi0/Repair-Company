import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { DeviceGrade, DeviceStatus } from "../device.entity";

export class CreateDeviceDto {
    @IsString()
    @IsNotEmpty()
    serialNumber: string;

    @IsString()
    @IsNotEmpty()
    brand: string;

    @IsString()
    @IsNotEmpty()
    model: string;

    @IsOptional()
    @IsEnum(DeviceStatus)
    status?: DeviceStatus;

    @IsOptional()
    @IsEnum(DeviceGrade)
    grade?: DeviceGrade;
}