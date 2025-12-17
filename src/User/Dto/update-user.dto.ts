import { IsEnum, IsOptional } from "class-validator";
import { UserRole } from "../user.entity";

export class UpdateUserDto{
    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;
}