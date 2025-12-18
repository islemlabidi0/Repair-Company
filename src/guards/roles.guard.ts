import {
  Injectable,//yaani nest ynajem yaamel copie mel class houni w yinjecteha "ydakheleha , yesta3meleha win ma yestehakea automatiquement"
  CanActivate,
  ExecutionContext,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';// bch nestaamlouh bch yakra el role eli chenhotouha comme attribut leli bch nkhalouh yestaamel el method 
import { ROLES_KEY } from '../common/roles.decorator';// howa ibara el blaca eli chenaalkouha ala kol beb method besm chkoon ynajem yodkhel w eli chyakraha el reflector

@Injectable()//voila houni khadamna  injection ala roleguard 
export class RolesGuard implements CanActivate { 
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return requiredRoles.includes(user.role);
  }
}
