import { AuthenticateUserService } from "@app/use-cases/user/authenticate-user-service";
import { PublicRoute } from "@infra/auth/decorators/public-route-decorator";
import { Body, Controller, Post } from "@nestjs/common";
import { AuthenticateUserBody } from "./dtos/authenticate-user-body";


@Controller('sessions')
export class SessionController {
  constructor(private authenticateUserService: AuthenticateUserService) { }

  @PublicRoute()
  @Post()
  async login(@Body() body: AuthenticateUserBody) {
    const { accessToken } = await this.authenticateUserService.execute(body)

    return { access_token: accessToken }
  }

}