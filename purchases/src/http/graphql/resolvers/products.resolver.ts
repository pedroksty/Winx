import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { ProductsService } from 'src/services/products.services';
import { Product } from '../models/product';

@Resolver()
export class ProductsResolver {
  constructor(private productsServices: ProductsService) { }

  @Query(() => [Product])
  // @UseGuards(AuthorizationGuard)
  products() {
    return this.productsServices.ListAllProducts()
  }
}
