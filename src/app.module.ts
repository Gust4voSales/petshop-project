import { HttpModule } from '@infra/http/http.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
})
export class AppModule { }
