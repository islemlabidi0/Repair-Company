import { createUserDto } from './Dto/create-user.dto';
import { UserService } from './user.service';
import { Controller, Post, Body } from "@nestjs/common";

//controller declaration , les routes lkol fl controller hetha yebdew b /users
@Controller('users')
export class UserController{
    constructor(private readonly UserService: UserService){}

    @Post()
    //@body to ready json body ml request 
    //createUserDto 5tr lezm lbody match the createUserDto
    create(@Body() createUserDto: createUserDto){
        return this.UserService.create(createUserDto);
    }
}