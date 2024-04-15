import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class ProjectInput {
  @Field({nullable: true})
  MasterProjectName?: string;

  @Field({nullable: true})
  ProjectDescription?: string;

  
  @Field({nullable: true})
  ClientContact?: string;

  @Field(({nullable: true}))
  Budget?: number;
}
