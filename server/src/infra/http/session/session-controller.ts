import { AuthenticateUserService } from "@app/use-cases/user/authenticate-user-service";
import { PublicRoute } from "@infra/auth/decorators/public-route-decorator";
import { Body, Controller, Get, Param, Post, Req, UseGuards } from "@nestjs/common";
import { AuthenticateUserBody } from "./dtos/authenticate-user-body";
import { UserViewModel } from "../view-models/user-view-model";
import { SignOutUserService } from "@app/use-cases/user/sign-out-user-service";
import { RefreshAccessTokenService } from "@app/use-cases/user/refresh-access-token-service";
import { Request } from "express";
import { RefreshJwtGuard } from "@infra/auth/refresh-jwt-auth.guard";
import { CurrentUser } from "@infra/auth/decorators/current-user-decorator";
import { User } from "@app/entities/user";


@Controller('sessions')
export class SessionController {
  constructor(private authenticateUserService: AuthenticateUserService, private signOutUserService: SignOutUserService, private refreshTokenService: RefreshAccessTokenService) { }

  @PublicRoute()
  @Post()
  async login(@Body() body: AuthenticateUserBody) {
    const { user, accessToken, refreshToken } = await this.authenticateUserService.execute(body)

    return { user: UserViewModel.toHTTP(user), accessToken, refreshToken }
  }

  @Post('/:id/sign-out')
  async signOut(@Param("id") id: string) {
    await this.signOutUserService.execute(id)
  }

  @PublicRoute() // so that we don't use the default JWT Guard
  @UseGuards(RefreshJwtGuard)
  @Post('/refresh-token')
  async refreshToken(@CurrentUser() user: User) {
    const tokens = await this.refreshTokenService.execute({ userId: user.id, refreshToken: user.refreshToken! });

    return tokens
  }

}