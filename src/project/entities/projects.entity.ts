import {Field, ID} from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn,PrimaryColumn } from 'typeorm';

@Entity()
export class Projects {
    @PrimaryGeneratedColumn('uuid')
    @PrimaryColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column()
    @Field()
    MasterProjectName: string;
    
    @Column({nullable: true})
    @Field()
    ProjectDescription?: string;

    @Column({nullable: true})
    @Field()
    ClientContact?: string;

    @Column({nullable: true})
    @Field()
    Budget?: number;
}
