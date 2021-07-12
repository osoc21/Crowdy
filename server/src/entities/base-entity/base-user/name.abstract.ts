import { ObjectType, Field } from '@nestjs/graphql';
import { Constructor } from '../../../shared/library/shared.constructor';
import {
  // PrimaryGeneratedColumn,
  Column,
  // BeforeUpdate,
  BeforeInsert,
} from 'typeorm';

export function EntityWithNames<TBase extends Constructor>(Base: TBase) {
  @ObjectType()
  abstract class AbstractBaseName extends Base {
    @Field(() => String)
    @Column('varchar', { length: 55 })
    firstname: string;

    @Field(() => String)
    @Column('varchar', { length: 55 })
    lastname: string;

    @Field(() => String)
    @Column('varchar', { length: 125 })
    fullname: string;

    @BeforeInsert()
    setFullName() {
      this.fullname = `${this.firstname} ${this.lastname}`;
    }
  }
  return AbstractBaseName;
}
