import { AuthenticateUserService } from "@app/use-cases/user/authenticate-user-service";
import { PublicRoute } from "@infra/auth/decorators/public-route-decorator";
import { Body, Controller, Post } from "@nestjs/common";
import { AuthenticateUserBody } from "./dtos/authenticate-user-body";
import { UserViewModel } from "../view-models/user-view-model";


@Controller('sessions')
export class SessionController {
  constructor(private authenticateUserService: AuthenticateUserService) { }

  @PublicRoute()
  @Post()
  async login(@Body() body: AuthenticateUserBody) {
    const { user, accessToken } = await this.authenticateUserService.execute(body)

    return { user: UserViewModel.toHTTP(user), access_token: accessToken }
  }

}