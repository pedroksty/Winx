import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) { }

  async ListAllProducts() {
    return await this.prisma.product.findMany()
  }
}