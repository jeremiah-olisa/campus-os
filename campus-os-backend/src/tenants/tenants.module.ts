import { Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [TenantsController],
  providers: [PrismaService, TenantsService],
})
export class TenantsModule {}
