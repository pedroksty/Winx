import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";

interface CreateEnrollmentParams {
  courseId: string
  studentId: string
}

interface GetByCourseAndStudentIdParams {
  courseId: string
  studentId: string
}

@Injectable()
export class EnrollmentsService {
  constructor(
    private prisma: PrismaService
  ) { }

  async getByCourseAndStudentId({ courseId, studentId }: GetByCourseAndStudentIdParams) {
    return await this.prisma.enrollment.findFirst({
      where: {
        courseId,
        studentId,
        canceledAt: null
      }
    })
  }



  async listAllEnrollments() {
    return await this.prisma.enrollment.findMany({
      where: {
        canceledAt: null
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  async listEnrollmentsByStudentId(studentId: string) {
    return await this.prisma.enrollment.findMany({
      where: {
        studentId,
        canceledAt: null
      },
      orderBy: {

      }
    })
  }

  async createEnrollment({ courseId, studentId }: CreateEnrollmentParams) {
    return await this.prisma.enrollment.create({
      data: {
        courseId,
        studentId,
      }
    })
  }
}