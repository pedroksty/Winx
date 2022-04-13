import { Injectable } from "@nestjs/common";
import slugify from 'slugify'
import { PrismaService } from "../database/prisma/prisma.service";

interface CreateCourseParams {
  slug?: string
  title: string
}

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

  async getCourseBySlug(slug: string) {
    return await this.prisma.course.findUnique({
      where: {
        slug
      }
    })
  }

  async createCourse({ title, slug = slugify(title, { lower: true }) }: CreateCourseParams) {


    const courseAlreadyExists = await this.prisma.course.findUnique({
      where: { slug }
    })

    if (courseAlreadyExists) {
      throw new Error('Course already exists')
    }

    const createdCourse = await this.prisma.course.create({
      data: {
        title,
        slug
      }
    })

    return createdCourse
  }

}