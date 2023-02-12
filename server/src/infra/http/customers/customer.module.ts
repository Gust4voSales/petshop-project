import { CreateCustomerService } from "@app/use-cases/customer/create-customer-service";
import { EditCustomerService } from "@app/use-cases/customer/edit-customer-service";
import { ListCustomersService } from "@app/use-cases/customer/list-customers-service";
import { ShowCustomerService } from "@app/use-cases/customer/show-customer-service";
import { DatabaseModule } from "@infra/database/database.module";
import { Module } from "@nestjs/common";
import { CustomersController } from "./customers.controller";

@Module({
  imports: [DatabaseModule],
  controllers: [CustomersController],
  providers: [CreateCustomerService, ListCustomersService, ShowCustomerService, EditCustomerService],
})
export class CustomerModule { }