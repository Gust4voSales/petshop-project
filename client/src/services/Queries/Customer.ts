import { Customer } from 'src/@types/Customer';
import api from '../api'


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
