import { ObjectType, Field } from '@nestjs/graphql';
import {
  EntityBaseWithDate,
  EntityBase,
} from 'src/entities/base-entity/base.entity';
import { EmptyClass } from 'src/shared/library';
import { Entity, Column, ManyToMany, JoinColumn } from 'typeorm';
import { HotSpot } from 'src/entities/hotspot/hotspot.entity';
import { HotspotType } from '../hotspotType/hotspotType.entity';

@ObjectType()
@Entity('hotspots_hotsposts_types')
export class Hotspots_hotspostsTypes extends EntityBaseWithDate(
  EntityBase(EmptyClass),
) {
  /* Space for hotspot Id */
  @Field(() => String)
  @Column('uuid')
  hotspotId: string;

  /* Space for hotspot types Id */
  @Field(() => String)
  @Column('uuid')
  hotspot_typeId: string;

  @ManyToMany(
    () => HotSpot,
    hotspot => hotspot.types,
    { primary: true },
  )
  @JoinColumn({ name: 'hotspotId' })
  hotspot: HotSpot;

  @ManyToMany(
    () => HotspotType,
    type => type.hotSpots,
    { primary: true },
  )
  @JoinColumn({ name: 'hotspot_typeId' })
  hotspotType: HotspotType;
}
