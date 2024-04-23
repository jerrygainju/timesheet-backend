import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppService } from './app.service'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo'
import { join } from 'path';
import { PostsModule } from './post/posts.module'
import { AuthorsModule } from './authors/authors.module'
import { ProjectModule } from './project/projects.module'
import { SignupModule } from './auth/signup.module'
import { ClientModule } from './client/clinet.module'

@Module({
  imports: [
    PostsModule,
    AuthorsModule,
    ProjectModule,
    SignupModule,
    ClientModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin',
      database: 'timesheet',
      entities: ['dist/**/*.entity.{ts,js}'],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
