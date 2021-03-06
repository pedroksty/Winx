import { Controller } from "@nestjs/common";
import { EventPattern, Payload } from "@nestjs/microservices";
import { CoursesService } from "services/courses.service";
import { EnrollmentsService } from "services/enrollments.service";
import { StudentsService } from "services/students.service";

interface PurchaseCreatedPayload {
  customer: {
    authUserId: string
  }
  product: {
    id: string
    title: string
    slug: string
  }
}

@Controller()
export class PurchaseController {
  constructor(
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private enrollmentService: EnrollmentsService
  ) { }


  @EventPattern('purchases.new-purchase')
  async purchaseCreated(
    @Payload('value') payload: PurchaseCreatedPayload
  ) {
    console.log('nova compra', payload.product.title)

    let student = await this.studentsService.getStudentByAuthUserId(payload.customer.authUserId)

    if (!student) {
      student = await this.studentsService.createStudent({
        authUserId: payload.customer.authUserId
      })
    }

    let course = await this.coursesService.getCourseBySlug(payload.product.slug)

    if (!course) {
      course = await this.coursesService.createCourse({
        title: payload.product.title,
      })

    }

    await this.enrollmentService.createEnrollment({
      courseId: course.id,
      studentId: student.id
    })


  }
}