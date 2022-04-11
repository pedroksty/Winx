import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";

interface CreatePurchaseParams {
  customerId: string
  productId: string
}

@Injectable()
export class PurchasesService {
  constructor(private prisma: PrismaService) { }

  async listAllPurchases() {
    return this.prisma.purchase.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  async listAllFromCustomer(customerId: string) {
    return this.prisma.purchase.findMany({
      where: { customerId },
      orderBy: {
        createdAt: 'desc'
      }
    })
  }

  async createPurchase({ customerId, productId }: CreatePurchaseParams) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId
      }
    })

    if (!product) {
      throw new Error('Product not found')
    }

    const createdPurchase = await this.prisma.purchase.create({
      data: {
        customerId,
        productId,
      }
    })

    return createdPurchase
  }
}