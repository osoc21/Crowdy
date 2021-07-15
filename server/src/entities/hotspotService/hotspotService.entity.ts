import { ObjectType, Field } from '@nestjs/graphql';
import {
  EntityBaseWithDate,
  EntityBase,
} from 'src/entities/base-entity/base.entity';
import { EmptyClass } from 'src/shared/library';
import { Entity, Column, OneToMany, ManyToOne, ManyToMany } from 'typeorm';
import { HotSpot } from '../hotspot/hotspot.entity';

@ObjectType()
@Entity('hotspotServices')
export class HotspotService extends EntityBaseWithDate(EntityBase(EmptyClass)) {
  /* Space for service name */
  @Field(() => String)
  @Column('varchar', { length: 55, unique: true })
  service_name: string;

  // Space for hotspot Services

  @Field(() => [HotSpot])
  @ManyToMany(
    () => HotSpot,
    hotSpot => hotSpot.services,
    { eager: true },
  )
  hotSpots: HotSpot[];

  /* Space for deleted service*/
  @Field(() => Boolean)
  @Column({ default: false })
  service_deleted: boolean;
}
