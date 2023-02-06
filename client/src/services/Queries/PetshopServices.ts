import { PetshopService } from 'src/@types/PetshopServices';
import api from '../api';

interface PetshopServicesReturn {
  services: PetshopService[]
}
export async function fetchPetshopServices(
) {
  const { data } = await api.get<PetshopServicesReturn>(
    `/services`
  );

  // throw new Error('vixi')
  // return { services: [] }
  return data;
}