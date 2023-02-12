import { Customer } from 'src/@types/Customer';
import api from '../api'

export const CUSTOMER_KEY = 'customer-fetch'

interface CustomersReturn {
  customers: Customer[]
}
export async function fetchCustomers(
) {
  const { data } = await api.get<CustomersReturn>(
    `/customers`
  );

  return data;
}


export async function createCustomer(customer: Omit<Customer, 'id' | 'pets'>) {
  await api.post("/customers", {
    ...customer
  })
}