import { Injectable } from "@nestjs/common";
import { Appointment } from "@app/entities/appointment";
import { AppointmentRepository, FindManyAppointmentsQuery } from "@app/repositories/appointment-repository";
import { PrismaService } from "../prisma.service";
import { AppointmentMapper } from "../mappers/appointment-mapper";
import dayjs from 'dayjs'


@Injectable()
export class PrismaAppointmentRepository implements AppointmentRepository {
  constructor(private prismaService: PrismaService) { }

  async create(appointment: Appointment) {
    await this.prismaService.appointment.create({
      data: AppointmentMapper.toPrisma(appointment)
    })
  }

  async findById(id: string): Promise<Appointment> {
    const appointment = await this.prismaService.appointment.findUnique({
      where: {
        id,
      },
      include: {
        pet: true,
        service: true,
      }
    })

    if (!appointment) return null
    return AppointmentMapper.toDomain(appointment)
  }

  async findMany(query?: FindManyAppointmentsQuery) {
    // if query parameters are undefined Prisma will ignore them 
    let startDate: Date | undefined
    let endDate: Date | undefined

    if (query) {
      startDate = dayjs(query.startDate).startOf("day").toDate() // consider the whole day, so sets time at 00h:00 to include the whole day
      endDate = dayjs(query.endDate).endOf("day").toDate() // consider the whole day, so sets time at 23h:59 to include the whole day
    }

    const appointments = await this.prismaService.appointment.findMany({
      where: {
        appointmentTime: {
          gte: startDate, // if undefined, prisma will ignore them
          lte: endDate, // if undefined, prisma will ignore them
        }
      },
      include: {
        pet: true,
        service: true
      }
    })

    return appointments.map(AppointmentMapper.toDomain)
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.appointment.delete({
      where: {
        id,
      }
    })
  }

  async countByPetId(id: string): Promise<number> {
    const count = await this.prismaService.appointment.count({
      where: {
        petId: id
      }
    })
    return count
  }

  async countByCustomerId(id: string): Promise<number> {
    const customer = await this.prismaService.customer.findUnique({
      where: {
        id,
      },
      include: {
        pets: {
          include: {
            _count: {
              select: {
                Appointment: true
              }
            }
          }
        }
      }
    })

    if (!customer) {
      return 0;
    }

    let appointmentCount = 0;
    customer.pets.forEach((pet) => {
      appointmentCount += pet._count.Appointment;
    })

    return appointmentCount;
  }

}