import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { diskStorage } from 'multer';

import { extname } from 'path';

import { AttendanceService } from './attendance.service';

import { JwtAuthGuard } from '../auth/jwt-auth/jwt-auth.guard';

import { CurrentUser } from '../common/decorators/current-user.decorator';

import { CreateAttendanceDto } from './dto/create-attendance.dto';

@Controller('attendance')
@UseGuards(JwtAuthGuard)
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('checkin')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads',

        filename: (req, file, callback) => {
          const uniqueName = Date.now() + extname(file.originalname);

          callback(null, uniqueName);
        },
      }),
    }),
  )
  async checkIn(
    @UploadedFile() file: Express.Multer.File,

    @Body() createAttendanceDto: CreateAttendanceDto,

    @CurrentUser() user: any,
  ) {
    return this.attendanceService.create(
      user.userId,
      file.filename,
      createAttendanceDto.notes,
    );
  }

  @Get()
  findAll() {
    return this.attendanceService.findAll();
  }

  @Get('my')
  findMyAttendance(@CurrentUser() user: any) {
    return this.attendanceService.findMyAttendance(user.userId);
  }
}
