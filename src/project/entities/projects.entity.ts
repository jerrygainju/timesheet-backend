import {Field, ID} from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Projects {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column({nullable: true})
    @Field()
    MasterProjectName?: string;
    
    @Column({nullable: true})
    @Field()
    ProjectDescription?: string;

    @Column({nullable: true})
    @Field()
    ProjectCost?: number;
}
