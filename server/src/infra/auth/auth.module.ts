import { Module } from "@nestjs/common";
import { JwtStrategy } from "./jwt.strategy";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { jwtConstants } from "./constants";


@Module({
  imports: [PassportModule, JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: {
      expiresIn: jwtConstants.expiresIn,
    },
  })],
  providers: [JwtStrategy,
    {
      provide: APP_GUARD, // defaultly protecting all routes with JwtAuthGuard
      useClass: JwtAuthGuard,
    }
  ],
  exports: [JwtModule]
})
export class AuthModule { }