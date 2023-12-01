import { User } from "@app/entities/user";
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'
import { jwtConstants } from "./constants";

interface UserPayload {
  sub: string
  name: string
  email: string
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
    })
  }

  async validate(payload: UserPayload): Promise<User> {
    return new User({ name: payload.name, email: payload.email, }, payload.sub) as User;
  }
}