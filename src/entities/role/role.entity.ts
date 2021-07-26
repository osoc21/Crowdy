import { ObjectType, Field } from '@nestjs/graphql';
import {
  EntityBaseWithDate,
  EntityBase,
} from 'src/entities/base-entity/base.entity';
import { EmptyClass } from 'src/shared/library';
import { Entity, Column, OneToMany } from 'typeorm';

@ObjectType()
@Entity('roles')
export class Role extends EntityBaseWithDate(EntityBase(EmptyClass)) {
  /* Space for role name */
  @Field(() => String)
  @Column('varchar', { length: 55, unique: true })
  role_name: string;

  /* Space for deleted */
  @Field(() => Boolean)
  @Column({ default: false })
  role_deleted: boolean;
}
