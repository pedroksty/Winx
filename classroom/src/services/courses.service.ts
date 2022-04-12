import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma/prisma.service";

@Injectable()
export class CoursesService {
  constructor(
    private prisma: PrismaService
  ) { }

  async listAllCourses() {
    return this.prisma.course.findMany()
  }

  async getCourseById(id: string) {
    return await this.prisma.course.findUnique({
      where: {
        id
      }
    })
  }
}