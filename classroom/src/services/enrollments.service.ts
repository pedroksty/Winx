import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";

@Injectable()
export class EnrollmentsService {
  constructor(
    private prisma: PrismaService
  ) { }

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
}