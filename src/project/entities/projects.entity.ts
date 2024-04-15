import {Field, ID} from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn,PrimaryColumn, OneToMany } from 'typeorm';

@Entity()
export class UnitProject {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column()
    @Field()
    unitProjectName: string;
    
    @Column({nullable: true})
    @Field()
    aoContact?: string;

       
    @Column({nullable: true})
    @Field()
    rpsContact?: string;

    @Column({nullable: true})
    @Field()
    unitBudget?: number;
}

@Entity()
export class Projects {
    @PrimaryGeneratedColumn('uuid')
    @PrimaryColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column()
    @Field()
    masterProjectName: string;
    
    @Column({nullable: true})
    @Field()
    projectDescription?: string;

    @Column({nullable: true})
    @Field()
    clientContact?: string;

    @Column({nullable: true})
    @Field()
    budget?: number;

    @OneToMany(() => UnitProject, unitProject => unitProject.unitProjectName)
    @Field(() => [UnitProject])
    unitProject?: UnitProject[];
}
