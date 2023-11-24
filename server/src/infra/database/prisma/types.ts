import { Prisma } from "@prisma/client"

export type RawAppointmentWithPetsAndService = Prisma.AppointmentGetPayload<{
  include: { pet: true, service: true }
}>