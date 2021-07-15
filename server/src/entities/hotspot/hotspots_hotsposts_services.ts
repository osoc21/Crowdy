import { ObjectType, Field } from '@nestjs/graphql';
import {
  EntityBaseWithDate,
  EntityBase,
} from 'src/entities/base-entity/base.entity';
import { EmptyClass } from 'src/shared/library';
import { Entity, Column, ManyToMany, JoinColumn } from 'typeorm';
import { HotSpot } from 'src/entities/hotspot/hotspot.entity';
import { HotspotService } from 'src/entities/hotspotService/hotspotService.entity';

@ObjectType()
@Entity('hotspots_hotsposts_services')
export class Hotspots_hotspostsServices extends EntityBaseWithDate(
  EntityBase(EmptyClass),
) {
  /* Space for hotspot Id */
  @Field(() => String)
  @Column('uuid')
  hotspotId: string;

  /* Space for hotspot services Id */
  @Field(() => String)
  @Column('uuid')
  hotspot_serviceId: string;

  @ManyToMany(
    () => HotSpot,
    hotspot => hotspot.services,
    { primary: true },
  )
  @JoinColumn({ name: 'hotspotId' })
  hotspot: HotSpot;

  @ManyToMany(
    () => HotspotService,
    service => service.hotSpots,
    { primary: true },
  )
  @JoinColumn({ name: 'hotspot_serviceId' })
  hotspotService: HotspotService;
}
