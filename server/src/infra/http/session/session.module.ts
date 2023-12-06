import { DatabaseModule } from "@infra/database/database.module";
import { Module, OnApplicationBootstrap, } from "@nestjs/common";
import { SessionController } from "./session-controller";
import { CryptographyModule } from "@infra/cryptography/cryptography.module";
import { AuthenticateUserService } from "@app/use-cases/user/authenticate-user-service";
import { CreateDefaultUserService } from "@app/use-cases/user/create-default-user-service";
import { SignOutUserService } from "@app/use-cases/user/sign-out-user-service";
import { RefreshAccessTokenService } from "@app/use-cases/user/refresh-access-token-service";


@Module({
  imports: [CryptographyModule, DatabaseModule],
  providers: [AuthenticateUserService, CreateDefaultUserService, SignOutUserService, RefreshAccessTokenService],
  controllers: [SessionController]
})
export class SessionModule implements OnApplicationBootstrap {
  constructor(private createDefaultUserService: CreateDefaultUserService) { }

  // CREATE DEFAULT ADMIN USER ACCOUNT
  async onApplicationBootstrap() {
    await this.createDefaultUserService.execute()
  }

} 