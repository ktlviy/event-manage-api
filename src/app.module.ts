import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { EventsModule } from './events/events.module';
import { ParticipantsModule } from './participants/participants.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UserModule,
    EventsModule,
    ParticipantsModule,
  ],
})
export class AppModule {}
