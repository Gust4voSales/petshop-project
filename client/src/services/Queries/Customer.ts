import { Customer } from 'src/@types/Customer';
import api from '../api'
import { CreateCustomerFormData } from '@components/customers/CreateCustomerForm';
import { EditCustomerFormData } from '@components/customers/EditCustomerForm';

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

export async function createCustomer(customer: CreateCustomerFormData) {
  const { data } = await api.post<{ customer: Customer }>("/customers", {
    ...customer
  })
  return data
}

export async function updateCustomer(id: string, customer: EditCustomerFormData) {
  await api.put(`/customers/${id}`, {
    ...customer
  })
}