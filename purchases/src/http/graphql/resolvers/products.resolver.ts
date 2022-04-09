import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';
import { ProductsService } from 'src/services/products.services';
import { CreateProductInput } from '../inputs/createProductInput';
import { Product } from '../models/product';

@Resolver()
export class ProductsResolver {
  constructor(private productsServices: ProductsService) { }

  @Query(() => [Product])
  // @UseGuards(AuthorizationGuard)
  products() {
    return this.productsServices.ListAllProducts()
  }

  @Mutation(() => Product)
  createProduct(
    @Args('data') data: CreateProductInput
  ) {
    return this.productsServices.createProduct(data)
  }
}
