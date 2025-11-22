import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { generateInviteCode } from '../common/utils';

@Injectable()
export class TenantsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTenantDto: CreateTenantDto) {
    const invitationCode = generateInviteCode(64);
    const tenant = await this.prisma.tenants.create({
      data: {
        name: createTenantDto.name,
        primaryEmail: createTenantDto.primaryEmail,
        slug: createTenantDto.slug,
        // ...createTenantDto,
        invitationCode,
      },
      select: { id: true, invitationCode: true },
    });
    return tenant;
  }

  findAll() {
    return this.prisma.tenants.findMany();
  }

  findOne(id: string) {
    return this.prisma.tenants.findFirst({
      where: { id },
    });
  }

  update(id: number, updateTenantDto: UpdateTenantDto) {
    return `This action updates a #${id} tenant`;
  }

  remove(id: number) {
    return `This action removes a #${id} tenant`;
  }
}
