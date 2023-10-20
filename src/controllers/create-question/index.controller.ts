import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../../auth/jwt-auth.guard'
import { CurrentUser } from '../../auth/current-user-decorator'
import { UserPayload } from '../../auth/jwt.strategy'
import { ZodValidationPipe } from '../../pipes/zod-validation-pipe'
import { PrismaService } from '../../prisma/prisma.service'
import { CreateQuestionBodySchema, createQuestionBodySchema } from './schema'
import { DuplicateSlugException } from '../../exceptions/duplicate-slug.exception'

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
