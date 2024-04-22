import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@ObjectType()
@Entity()
export class Signup {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => ID)
    id: string;

    @Column()
    @Field()
    username: string;

    @Column()
    @Field()
    email: string;

    @Column()
    @Field()
    password: string;

    @Column({ default: '' })
    @Field()
    resetToken: string
}