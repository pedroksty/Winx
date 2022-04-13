import { UnauthorizedException, UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthorizationGuard } from "http/auth/authorization.guard";
import { AuthUser, CurrentUser } from "http/auth/currentUser";
import { CoursesService } from "services/courses.service";
import { EnrollmentsService } from "services/enrollments.service";
import { StudentsService } from "services/students.service";
import { createCourseInput } from "../inputs/createCourseInput";
import { Course } from "../models/course";


@Resolver(() => Course)
export class CoursesResolver {
  constructor(
    private coursesService: CoursesService,
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService

  ) { }

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  async courses() {
    return await this.coursesService.listAllCourses()
  }

  @Query(() => Course)
  @UseGuards(AuthorizationGuard)
  async course(
    @Args('id') id: string,
    @CurrentUser() user: AuthUser
  ) {
    const student = await this.studentsService.getStudentByAuthUserId(user.sub)

    if (!student) {
      throw new Error('Student not found')
    }

    const enrollment = await this.enrollmentsService.getByCourseAndStudentId({
      courseId: id,
      studentId: student.id
    })

    if (!enrollment) {
      throw new UnauthorizedException()
    }

    return await this.coursesService.getCourseById(id)
  }



  @Mutation(() => Course)
  @UseGuards(AuthorizationGuard)
  async createCourse(
    @Args('data') data: createCourseInput
  ) {
    return await this.coursesService.createCourse(data)
  }
}