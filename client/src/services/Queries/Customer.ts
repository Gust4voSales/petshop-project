import { Customer } from 'src/@types/Customer';
import api from '../api'
import { CreateCustomerFormData } from '@components/customers/CreateCustomerForm';
import { EditCustomerFormData } from '@components/customers/EditCustomerForm';
import { PetFormData } from '@components/customers/pets/PetForm';
import { Pet } from '@@types/Pet';

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
  const { data } = await api.put<{ customer: Customer }>(`/customers/${id}`, {
    ...customer
  })
  return data
}

export async function addCustomerPet(id: string, pet: PetFormData) {
  const { data } = await api.post<{ pet: Pet }>(`/pets`, { ...pet, ownerId: id })
  return data
}