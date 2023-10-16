import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { PrismaService } from './prisma/prisma.service'

@Controller()
export class AppController {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private readonly appService: AppService,
    private prisma: PrismaService,
  ) {}

  @Get('/hello')
  index(): string {
    return this.appService.getHello()
  }

  @Get('/teste')
  async store() {
    const users = await this.prisma.user.findMany()
    console.log({ users })
    return users
  }
}
