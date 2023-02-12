import { CreateCustomerService } from "@app/use-cases/customer/create-customer-service";
import { EditCustomerService } from "@app/use-cases/customer/edit-customer-service";
import { ListCustomersService } from "@app/use-cases/customer/list-customers-service";
import { ShowCustomerService } from "@app/use-cases/customer/show-customer-service";
import { Controller, Body, Post, Get, Put, Param } from "@nestjs/common"
import { CustomerViewModel } from "../view-models/customer-view-model";
import { CreateCustomerBody } from "./dtos/create-customer-body";
import { UpdateCustomerBody } from "./dtos/update-customer-body";

@Controller("customers")
export class CustomersController {
  constructor(
    private createCustomerService: CreateCustomerService,
    private listCustomersService: ListCustomersService,
    private editCustomerService: EditCustomerService,
    private showCustomerService: ShowCustomerService,
  ) { }

  @Get()
  async list() {
    const { customers } = await this.listCustomersService.execute()

    return { customers: customers.map(CustomerViewModel.toHTTP) }
  }

  @Get(":id")
  async show(@Param("id") id: string) {
    const { customer } = await this.showCustomerService.execute(id)

    return { customer: CustomerViewModel.toHTTP(customer) }
  }

  @Post()
  async create(@Body() body: CreateCustomerBody) {
    const { customer } = await this.createCustomerService.execute(body)

    return { customer: CustomerViewModel.toHTTP(customer) }
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() body: UpdateCustomerBody) {
    const { customer } = await this.editCustomerService.execute({ id, body })

    return { customer: CustomerViewModel.toHTTP(customer) }
  }
} 