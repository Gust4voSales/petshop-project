import { CreateClientService } from "@app/use-cases/client/create-client-service";
import { ListClientsService } from "@app/use-cases/client/list-clients-service";
import { DatabaseModule } from "@infra/database/database.module";
import { Module } from "@nestjs/common";
import { ClientController } from "./client.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [ClientController],
  providers: [CreateClientService, ListClientsService],
})
export class ClientModule { }