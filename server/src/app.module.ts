import { Module } from '@nestjs/common';
import { HttpModule } from '@infra/http/http.module';
import { AuthModule } from '@infra/auth/auth.module';

@Module({
  imports: [AuthModule, HttpModule],
})
export class AppModule { }
