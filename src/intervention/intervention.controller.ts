import { InterventionService } from './intervention.service';
import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { CreateInterventionDto } from './Dto/create-intervention.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/common/roles.decorator';
//ken technicien ynjm y3ml create interventions w lezm ykoun connecté 
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('TECH')
@Controller('interventions')
export class InterventionController{
    constructor(
        private readonly InterventionService: InterventionService,
    ){}

    @Post()
    create(
        @Body() dto: CreateInterventionDto,
        @Req() requestAnimationFrame,
    ){
        return this.InterventionService.create(dto, requestAnimationFrame.user);
    }
}