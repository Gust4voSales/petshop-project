import { Module } from '@nestjs/common';
import { HttpModule } from '@infra/http/http.module';
import { AuthModule } from '@infra/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), AuthModule, HttpModule],
})
export class AppModule { }
