import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Post } from '../../post/entities/posts.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Author {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @OneToMany(() => Post, (post) => post.author)
  @Field(() => [Post])
  posts: Post[];
}