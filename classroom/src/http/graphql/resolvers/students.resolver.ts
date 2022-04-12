import { Resolver } from "@nestjs/graphql";
import { Student } from "../models/student";

@Resolver(() => Student)
export class StudentsRevolers {

}