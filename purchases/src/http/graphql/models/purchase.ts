import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql"

enum PurchaseStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  FAILED = 'FAILED'
}

registerEnumType(PurchaseStatus, {
  name: 'PurchaseStatus',
  description: 'Avaiable purchase status'
})

@ObjectType()
export class Purchase {
  @Field(() => ID)
  id: string

  @Field(() => PurchaseStatus)
  status: PurchaseStatus

  @Field(() => Date)
  createdAt: Date
}