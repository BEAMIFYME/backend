import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtGuard.name);

  handleRequest(err, user, info) {
    if (err || !user) {
      this.logger.error(`Authentication failed: ${info?.message}`);
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
