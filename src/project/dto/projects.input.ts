import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class ProjectInput {
  @Field()
  masterProjectName: string;

  @Field({nullable: true})
  projectDescription?: string;

  
  @Field({nullable: true})
  clientContact?: string;

  @Field(({nullable: true}))
  budget?: number;
}
