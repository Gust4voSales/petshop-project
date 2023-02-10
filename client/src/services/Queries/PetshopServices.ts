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

  return data;
}

export async function createPetshopService(petshopService: Omit<PetshopService, 'id'>) {
  await api.post("/services", {
    ...petshopService
  })
}