import { CreateClientService } from "@app/use-cases/client/create-client-service";
import { ListClientsService } from "@app/use-cases/client/list-clients-service";
import { Controller, Body, Post, Get } from "@nestjs/common"
import { ClientViewModel } from "../view-models/client-view-model";
import { CreateClientBody } from "./dtos/create-client-body";

@Controller("clients")
export class ClientController {
  constructor(private createClientService: CreateClientService, private listClientsService: ListClientsService) { }

  @Get()
  async list() {
    const { clients } = await this.listClientsService.execute()

    return { clients: clients.map(ClientViewModel.toHTTP) }
  }

  @Post()
  async create(@Body() body: CreateClientBody) {
    await this.createClientService.execute(body)
  }
} 