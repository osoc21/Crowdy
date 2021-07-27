import { ObjectType, Field } from '@nestjs/graphql';
import {
  EntityBaseWithDate,
  EntityBase,
} from 'src/entities/base-entity/base.entity';
import { EmptyClass } from 'src/shared/library';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { HotSpot } from 'src/entities/hotspot/hotspot.entity';

@ObjectType()
@Entity('votes')
export class Vote extends EntityBaseWithDate(EntityBase(EmptyClass)) {
  /* Space for vote value */
  @Field(() => String)
  @Column('varchar', { length: 55 })
  vote_value: string;

  /* Space for hotspot and the relation*/
  @Field(() => HotSpot)
  @ManyToOne(
    type => HotSpot,
    hotspot => hotspot.votes,
    { eager: true },
  )
  hotspot: HotSpot;

  // ** space for votes
  // @Field(() => [HotSpot])
  // @OneToMany(
  //   type => HotSpot,
  //   hotspot => hotspot.votes,
  //   { eager: false, nullable: true },
  // )
  // hotspots: HotSpot[];

  /* Space for vote deleted */
  @Field(() => Boolean)
  @Column({ default: false })
  vote_deleted: boolean;
}
