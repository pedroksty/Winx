import { Query, Resolver } from "@nestjs/graphql";
import { EnrollmentsService } from "services/enrollments.service";
import { Course } from "../models/course";
import { Enrollment } from "../models/enrollment";

@Resolver(() => Course)
export class CoursesResolver {
  constructor(
    private enrollmentService: EnrollmentsService,

  ) { }

  @Query(() => [Enrollment])
  async students() {
    return await this.enrollmentService.listAllEnrollments()
  }
}