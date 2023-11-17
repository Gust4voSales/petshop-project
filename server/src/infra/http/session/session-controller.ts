import { AuthenticateUserService } from "@app/use-cases/user/authenticate-user-service";
import { PublicRoute } from "@infra/auth/decorators/public-route-decorator";
import { Body, Controller, Post } from "@nestjs/common";


@Controller('sessions')
export class SessionController {
  constructor(private authenticateUserService: AuthenticateUserService) { }

  @PublicRoute()
  @Post()
  async login(@Body() body: any) {
    const { accessToken } = await this.authenticateUserService.execute(body)

    return { access_token: accessToken }
  }

}