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

export async function fetchCustomer(id: string) {
  const { data } = await api.get<{ customer: Customer }>(
    `/customers/${id}`
  );

  return data;
}

export async function createCustomer(customer: Omit<Customer, 'id' | 'pets'>) {
  const { data } = await api.post<{ customer: Customer }>("/customers", {
    ...customer
  })
  return data
}

export async function updateCustomer(id: string, customer: Omit<Customer, 'id' | 'pets'>) {
  await api.put(`/customers/${id}`, {
    ...customer
  })
}