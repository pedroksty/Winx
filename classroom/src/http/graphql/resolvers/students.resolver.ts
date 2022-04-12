import { UseGuards } from "@nestjs/common";
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { AuthorizationGuard } from "http/auth/authorization.guard";
import { AuthUser, CurrentUser } from "http/auth/currentUser";
import { EnrollmentsService } from "services/enrollments.service";
import { StudentsService } from "services/students.service";
import { Student } from "../models/student";

@Resolver(() => Student)
export class StudentsResolver {
  constructor(
    private studentsService: StudentsService,
    private enrollmentsService: EnrollmentsService
  ) { }

  @Query(() => Student)
  @UseGuards(AuthorizationGuard)
  async me(
    @CurrentUser() user: AuthUser
  ) {
    return await this.studentsService.getStudentByAuthUserId(user.sub)
  }


  @Query(() => [Student])
  @UseGuards(AuthorizationGuard)
  async students() {
    return await this.studentsService.listAllStudents()
  }

  @ResolveField()
  enrollments(
    @Parent() student: Student
  ) {
    return this.enrollmentsService.listEnrollmentsByStudentId(student.id)
  }



}