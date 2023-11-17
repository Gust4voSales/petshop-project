import { DatabaseModule } from "@infra/database/database.module";
import { Module, OnApplicationBootstrap, } from "@nestjs/common";
import { SessionController } from "./session-controller";
import { CryptographyModule } from "@infra/cryptography/cryptography.module";
import { AuthenticateUserService } from "@app/use-cases/user/authenticate-user-service";
import { CreateDefaultUserService } from "@app/use-cases/user/create-default-user-service";


@Module({
  imports: [CryptographyModule, DatabaseModule],
  providers: [AuthenticateUserService, CreateDefaultUserService],
  controllers: [SessionController]
})
export class SessionModule implements OnApplicationBootstrap {
  constructor(private createDefaultUserService: CreateDefaultUserService) { }

  async onApplicationBootstrap() {
    await this.createDefaultUserService.execute()
  }

} 