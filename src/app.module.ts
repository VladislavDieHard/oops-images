import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path'
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { FileModule } from './file/file.module';
import { PostModule } from './post/post.module';
import { TagModule } from './tag/tag.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
      ServeStaticModule.forRoot({
          rootPath: path.resolve(__dirname, 'static')
      }),
      ConfigModule.forRoot({
          envFilePath: '.env'
      }),
      MongooseModule.forRoot(process.env.DB_URL),
      UserModule,
      FileModule,
      PostModule,
      TagModule,
      AuthModule
  ],
  providers: [AppService],
})
export class AppModule {}
