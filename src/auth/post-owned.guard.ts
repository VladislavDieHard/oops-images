import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service";

@Injectable()
export class PostOwnedGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private userService: UserService
    ) {
    }

    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest()
        try {
            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
            const decodedToken = this.jwtService.decode(token);
            const user = await this.userService.getUserByName(decodedToken['username']);
            if (user.posts.includes(req.params.id)) {
                req.user = this.jwtService.verify(token);
                return true;
            } else {
                throw new UnauthorizedException({message: 'Вы не являетесь автором поста'})
            }
        } catch (e) {
            throw new UnauthorizedException({message: 'Вы не являетесь автором поста'})
        }
    }

}