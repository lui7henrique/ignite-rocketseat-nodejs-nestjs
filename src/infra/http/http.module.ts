import { Module } from '@nestjs/common'
import { CreateAccountController } from './controllers/create-account/index.controller'
import { AuthenticateController } from './controllers/authenticate/index.controller'
import { CreateQuestionController } from './controllers/create-question/index.controller'
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions/index.controller'
import { DatabaseModule } from '../database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
    FetchRecentQuestionsController,
  ],
})
export class HttpModule {}
