import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "./constants";
import { UserTokenPayload } from "@app/use-cases/user/helpers/generate-access-tokens";
import { User } from "@app/entities/user";

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.refreshTokenSecret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: UserTokenPayload) {
    const refreshToken = req.get('Authorization')?.replace('Bearer', '').trim();

    return new User({ name: payload.name, email: payload.email, refreshToken }, payload.sub);
  }
}
