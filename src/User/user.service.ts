import { UpdateUserDto } from './Dto/update-user.dto';
import { createUserDto } from './Dto/create-user.dto';
import { Injectable, BadRequestException, NotFoundException } from "@nestjs/common";
import { InjectRepository} from "@nestjs/typeorm";
import { Repository } from "typeorm"; 
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        //nestJS ya3ml user repository w yconnectiha b user table fi mysql
        private readonly userRepository: Repository<User>,
    ){}

    async create(createUserDto: createUserDto): Promise<User> {
        const {email, username, password, role } = createUserDto;

        //nchoufou ken l email déjà mawjoud
        const existingUser = await this.userRepository.findOne({
            where: { email },
        });
        //ken yel9a l email déjà mawjoud y5arajlou msg
        if(existingUser){
            throw new BadRequestException('Email already in use');
        }

        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        //nesn3ou l user
        const user = this.userRepository.create({
            email,
            username,
            password: hashedPassword,
            role,
        });
        //  save user in database
        return this.userRepository.save(user);

    }

    async update(
        id: number,
        UpdateUserDto: UpdateUserDto,
    ): Promise<User>{
        const user = await this.userRepository.findOne({
            where: { id },
        });
        if(!user){
            throw new NotFoundException('User not found');
        }

        //netaakdou ken l body fera5 wale
        if(!UpdateUserDto.role || UpdateUserDto.role === user.role){
            throw new BadRequestException('No changes made');
        }

        //apply the update
        user.role = UpdateUserDto.role;

        return this.userRepository.save(user);
    }

    //get all users
    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    //get a user by ID
    async findOne(id: number): Promise<User> {
        const user = await this.userRepository.findOne({where: { id } });
        if(!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }
}