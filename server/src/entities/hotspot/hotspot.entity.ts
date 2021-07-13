import { ObjectType, Field } from '@nestjs/graphql';
import {
  EntityBaseWithDate,
  EntityBase,
} from 'src/entities/base-entity/base.entity';
import { EmptyClass } from 'src/shared/library';
import { Entity, Column, OneToMany } from 'typeorm';
import GraphQLJSON from 'graphql-type-json';

@ObjectType()
@Entity('hotspots')
export class HotSpot extends EntityBaseWithDate(EntityBase(EmptyClass)) {
  /* Space for hotsot name */
  @Field(() => String)
  @Column('varchar', { length: 55, unique: true })
  hotspot_name: string;

  /* Space for coordinates*/
  @Field(() => [GraphQLJSON], { nullable: true })
  @Column('jsonb')
  coordinates: object[];

  /* Space for hotspot city */
  @Field(() => String, { nullable: true })
  @Column('varchar', { length: 55, unique: true, nullable: true })
  city: string;

  /* Space for hotspot district */
  @Field(() => String, { nullable: true })
  @Column('varchar', { length: 55, unique: true, nullable: true })
  district: string;

  /* Space for hotspot street */
  @Field(() => String, { nullable: true })
  @Column('varchar', { length: 55, unique: true, nullable: true })
  street: string;

  /* Space for hotspot street number */
  @Field(() => String, { nullable: true })
  @Column('varchar', { length: 55, unique: true, nullable: true })
  number: string;

  /* Space for status */
  @Field(() => String, { nullable: true })
  @Column('varchar', { default: 'active' })
  hotspot_status: string;
}
