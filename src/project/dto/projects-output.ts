import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
export class ProjectOutput {
  @Field(() => ID)
  id: string;

  @Field()
  masterProjectName: string;

  @Field({nullable: true})
  projectDescription?: string;

  @Field({nullable: true})
  clientContact?: string;

  @Field(({nullable: true}))
  budget?: number;
}
