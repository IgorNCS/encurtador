import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloController } from './hello/hello.controller';
import { UserModule } from './user/user.module';
import { ShortenerModule } from './shortener/shortener.module';
import { ConfigModule } from '@nestjs/config';
import { RedirectModule } from './redirect/redirect.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: './.env',
  }), UserModule, ShortenerModule, RedirectModule],
  controllers: [AppController, HelloController],
  providers: [AppService],
})
export class AppModule { }
