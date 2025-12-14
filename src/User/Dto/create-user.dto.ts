//Data transfer object t7aded chniya l client lezm yeb3th
//purpose: input validation , security , API contract
//DTOs are mandatory 

import { IsEmail, IsEnum, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { UserRole } from '../user.entity';

export class createUserDto{
    @IsEmail()
    email:string;

    @IsNotEmpty()
    username: string;

    @MinLength(6)
    password: string;

    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;
}