import { Module } from '@nestjs/common'
import { CreateAccountController } from './controllers/create-account/index.controller'
import { AuthenticateController } from './controllers/authenticate/index.controller'
import { CreateQuestionController } from './controllers/create-question/index.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions/index.controller'
import { PrismaService } from '../prisma/prisma.service'

@Module({
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
  providers: [PrismaService],
})
export class HttpModule {}
