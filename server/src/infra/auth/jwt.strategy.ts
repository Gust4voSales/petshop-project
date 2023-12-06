import { User } from "@app/entities/user";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'
import { jwtConstants } from "./constants";
import { UserTokenPayload } from "@app/use-cases/user/helpers/generate-access-tokens";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.jwtSecret,
    })
  }

  async validate(payload: UserTokenPayload): Promise<User> {
    return new User({ name: payload.name, email: payload.email, }, payload.sub);
  }
}