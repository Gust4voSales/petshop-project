import { PetshopService } from '@/@types/PetshopServices';
import api from '../api';

// Query key
export const PETSHOPSERVICE_KEY = "petshopService-fetch"


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

export async function fetchPetshopService(id: string) {
  const { data } = await api.get<{ service: PetshopService }>(
    `/services/${id}`
  );

  return data;
}

export async function createPetshopService(petshopService: Omit<PetshopService, 'id'>) {
  await api.post("/services", {
    ...petshopService
  })
}

export async function updatePetshopService(id: string, petshopService: Omit<PetshopService, 'id'>) {
  await api.put(`/services/${id}`, {
    ...petshopService
  })
}

export async function deletePetshopService(id: string) {
  await api.delete(`/services/${id}`)
}