import { HttpException, HttpStatus } from '@nestjs/common'

export class DuplicateSlugException extends HttpException {
  constructor(slug: string) {
    super(
      `Slug "${slug}" already exists. Please choose a unique slug.`,
      HttpStatus.CONFLICT,
    )
  }
}
