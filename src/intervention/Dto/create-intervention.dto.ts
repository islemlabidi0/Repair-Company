import { IsArray, IsInt, IsNotEmpty } from "class-validator";

export class CreateInterventionDto{
    @IsInt()
    deviceId: number;

    @IsArray()
    SparePartIds: number[];

    @IsNotEmpty()
    description: string;
}