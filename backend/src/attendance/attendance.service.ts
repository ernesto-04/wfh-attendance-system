import { BadRequestException, Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  async create(employeeId: number, photoPath: string, notes?: string) {
    // Start of current day
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if employee has already checked in today
    const existingAttendance = await this.prisma.attendance.findFirst({
      where: {
        employeeId,
        createdAt: {
          gte: today,
        },
      },
    });

    if (existingAttendance) {
      throw new BadRequestException('Attendance already submitted today');
    }

    return this.prisma.attendance.create({
      data: {
        employeeId,
        photoPath,
        notes,
      },

      include: {
        employee: true,
      },
    });
  }

  async findAll() {
    return this.prisma.attendance.findMany({
      include: {
        employee: true,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findMyAttendance(employeeId: number) {
    return this.prisma.attendance.findMany({
      where: {
        employeeId,
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
