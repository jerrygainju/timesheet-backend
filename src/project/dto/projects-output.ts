import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class ProjectOutput {
  @Field(() => ID)
  id: string;

  @Field({nullable: true})
  MasterProjectName?: string;

  @Field({nullable: true})
  ProjectDescription?: string;

  @Field(({nullable: true}))
  ProjectCost?: number;
}
