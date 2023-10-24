import { Body, Controller, Post, UseGuards } from '@nestjs/common'

import { CreateQuestionBodySchema, createQuestionBodySchema } from './schema'
import { DuplicateSlugException } from '@/core/errors/errors/duplicate-slug.exception'
import { JwtAuthGuard } from '@/infra/auth/jwt-auth.guard'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import { UserPayload } from '@/infra/auth/jwt.strategy'
import { PrismaService } from '@/infra/prisma/prisma.service'

import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema)

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private prisma: PrismaService) {}

  @Post()
  async handle(
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content } = body
    const userId = user.sub

    const slug = this.convertToSlug(title)

    const isSlugUnique = await this.isSlugUnique(slug)

    if (!isSlugUnique) {
      throw new DuplicateSlugException(slug)
    }

    const question = await this.prisma.question.create({
      data: {
        authorId: userId,
        title,
        content,
        slug,
      },
    })

    return { question }
  }

  private convertToSlug(title: string): string {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
  }

  private async isSlugUnique(slug: string): Promise<boolean> {
    const existingQuestion = await this.prisma.question.findFirst({
      where: {
        slug,
      },
    })
    return !existingQuestion
  }
}
