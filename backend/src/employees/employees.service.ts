import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service';

import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  async create(createEmployeeDto: CreateEmployeeDto) {
    const hashedPassword = await bcrypt.hash(createEmployeeDto.password, 10);

    return this.prisma.employee.create({
      data: {
        ...createEmployeeDto,
        password: hashedPassword,
      },

      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        department: true,
        createdAt: true,
      },
    });
  }

  findAll() {
    return this.prisma.employee.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        department: true,
        createdAt: true,
      },

      orderBy: {
        id: 'desc',
      },
    });
  }
  update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    return this.prisma.employee.update({
      where: { id },

      data: updateEmployeeDto,

      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        department: true,
        createdAt: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.employee.delete({
      where: { id },
    });
  }
}
