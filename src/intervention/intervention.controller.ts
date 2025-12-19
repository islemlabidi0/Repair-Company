import { InterventionService } from './intervention.service';
import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CreateInterventionDto } from './Dto/create-intervention.dto';
//ken technicien ynjm y3ml create interventions w lezm ykoun connecté 
@UseGuards(JwtAuthGuard)

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