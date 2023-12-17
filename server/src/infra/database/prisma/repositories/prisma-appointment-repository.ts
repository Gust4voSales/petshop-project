import { Injectable } from "@nestjs/common";
import { Appointment } from "@app/entities/appointment";
import { AppointmentRepository, FindManyAppointmentsQueryPaginatedSorted } from "@app/repositories/appointment-repository";
import { PrismaService, } from "../prisma.service";
import { AppointmentMapper } from "../mappers/appointment-mapper";
import dayjs from 'dayjs'
import { RawAppointmentWithPetsAndService } from "../types";
import { Paginator } from "@app/repositories/utils/pagination";
import { Prisma } from "@prisma/client";
import { getPrismaSorter } from "./utils/prisma-sorter";

@Injectable()
export class PrismaAppointmentRepository implements AppointmentRepository {
  constructor(private prismaService: PrismaService, private paginator: Paginator) { }

  async create(appointment: Appointment) {
    await this.prismaService.appointment.create({
      data: AppointmentMapper.toPrisma(appointment)
    })
  }

  async save(appointment: Appointment): Promise<void> {
    await this.prismaService.appointment.update({
      where: {
        id: appointment.id
      },
      data: AppointmentMapper.toPrisma(appointment),
    })
  }

  async findById(id: string): Promise<Appointment | null> {
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

  async findManyPaginated(query: FindManyAppointmentsQueryPaginatedSorted) {
    // if query parameters are undefined Prisma will ignore them 
    let startDate: Date | undefined
    let endDate: Date | undefined

    if (query.startDate && query.endDate) {
      startDate = dayjs(query.startDate).toDate()
      endDate = dayjs(query.endDate).toDate()
    }

    const queryArgs: Prisma.AppointmentFindManyArgs = {
      where: {
        appointmentTime: {
          gte: startDate, // if undefined, prisma will ignore them
          lte: endDate, // if undefined, prisma will ignore them
        },
        status: query.status
      },
      orderBy: [
        { ...getPrismaSorter({ sortBy: query.sortBy, sortOrder: query.sortOrder }) },

        // if the query is not already sorting by appointmentTime and , always sort by appointmentTime descending
        query.sortBy !== 'appointmentTime' ? { appointmentTime: 'desc' } : {},
      ],
      include: {
        pet: true,
        service: true
      }
    }

    const paginatedResut = await this.paginator.paginate<RawAppointmentWithPetsAndService>(
      {
        model: this.prismaService.appointment,
        args: queryArgs,
        options: {
          page: query.page,
          pageSize: query.pageSize
        }
      }
    )

    return {
      ...paginatedResut,
      data: paginatedResut.data.map(AppointmentMapper.toDomain)
    }
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