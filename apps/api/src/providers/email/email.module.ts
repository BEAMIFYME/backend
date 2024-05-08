import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { UsersModule } from '../../api/users/users.module';
import { VerificationEmailService } from './templates/verification-email.service';

@Module({
  imports: [UsersModule],
  controllers: [EmailController],
  providers: [EmailService, VerificationEmailService],
  exports: [EmailService],
})
export class EmailModule {}
