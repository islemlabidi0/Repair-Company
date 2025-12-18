import { UserRole } from './../User/user.entity';
import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class IsTechGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        let req = context.switchToHttp().getRequest();
        if(req.user.role == UserRole.TECH)
            return true;
        return false;
    }
}