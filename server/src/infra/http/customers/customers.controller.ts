import { CreateCustomerService } from "@app/use-cases/customer/create-customer-service";
import { ListCustomersService } from "@app/use-cases/customer/list-customers-service";
import { Controller, Body, Post, Get } from "@nestjs/common"
import { CustomerViewModel } from "../view-models/customer-view-model";
import { CreateCustomerBody } from "./dtos/create-customer-body";

@Controller("customers")
export class CustomersController {
  constructor(private createCustomerService: CreateCustomerService, private listCustomersService: ListCustomersService) { }

  @Get()
  async list() {
    const { customers } = await this.listCustomersService.execute()

    return { customers: customers.map(CustomerViewModel.toHTTP) }
  }

  @Post()
  async create(@Body() body: CreateCustomerBody) {
    await this.createCustomerService.execute(body)
  }
} 