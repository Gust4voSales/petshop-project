import { PetRepository } from "@app/repositories/pet-repository";
import { Injectable } from "@nestjs/common";
import { EntityNotFound } from "../errors/entity-not-found";
import { AppointmentRepository } from "@app/repositories/appointment-repository";
import { InvalidDeleteOperation } from "../errors/invalid-delete-operation";


@Injectable()
export class DeletePetService {
  constructor(private petRepository: PetRepository, private appointmentsRepository: AppointmentRepository) { }

  async execute(id: string) {
    const pet = await this.petRepository.findById(id)
    if (!pet) throw new EntityNotFound("Pet", id)

    const petAppointments = await this.appointmentsRepository.countByPetId(id)
    if (petAppointments > 0) throw new InvalidDeleteOperation(`Pet with ${id} has appointments.`)

    return await this.petRepository.deleteById(id)
  }
}