import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class ProjectOutput {
  @Field(() => ID)
  id: string;

  @Field()
  MasterProjectName: string;

  @Field({nullable: true})
  ProjectDescription?: string;

  @Field({nullable: true})
  ClientContact?: string;

  @Field(({nullable: true}))
  Budget?: number;
}
