import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthorizationGuard } from "http/auth/authorization.guard";
import { CoursesService } from "services/courses.service";
import { createCourseInput } from "../inputs/createCourseInput";
import { Course } from "../models/course";


@Resolver(() => Course)
export class CoursesResolver {
  constructor(
    private coursesService: CoursesService

  ) { }

  @Query(() => [Course])
  @UseGuards(AuthorizationGuard)
  async courses() {
    return await this.coursesService.listAllCourses()
  }

  @Mutation(() => Course)
  @UseGuards(AuthorizationGuard)
  async createCourse(
    @Args('data') data: createCourseInput
  ) {
    return await this.coursesService.createCourse(data)
  }
}