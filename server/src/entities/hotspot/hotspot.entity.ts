import { ObjectType, Field } from '@nestjs/graphql';
import {
  EntityBaseWithDate,
  EntityBase,
} from 'src/entities/base-entity/base.entity';
import { EmptyClass } from 'src/shared/library';
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import GraphQLJSON from 'graphql-type-json';
import { HotspotType } from 'src/entities/hotspotType/hotspotType.entity';
import { HotspotService } from 'src/entities/hotspotService/hotspotService.entity';

@ObjectType()
@Entity('hotspots')
export class HotSpot extends EntityBaseWithDate(EntityBase(EmptyClass)) {
  /* Space for hotsot name */
  @Field(() => String)
  @Column('varchar', { length: 55, unique: true })
  hotspot_name: string;

  /* Space for coordinates*/
  @Field(() => [GraphQLJSON])
  @Column('jsonb')
  coordinates: object[];

  /* Space for hotspot city */
  @Field(() => String)
  @Column('varchar', { length: 55, unique: true, nullable: true })
  city: string;

  /* Space for hotspot district */
  @Field(() => String)
  @Column('varchar', { length: 55, unique: true, nullable: true })
  district: string;

  /* Space for hotspot street */
  @Field(() => String)
  @Column('varchar', { length: 55, unique: true, nullable: true })
  street: string;

  /* Space for hotspot street number */
  @Field(() => String)
  @Column('varchar', { length: 55, unique: true, nullable: true })
  number: string;

  /* Space for status */
  @Field(() => String)
  @Column('varchar', { default: 'active' })
  hotspot_status: string;

  // Space for hotspot Types
  @Field(() => HotspotType)
  @ManyToOne(
    type => HotspotType,
    type => type.hotspots,
    { eager: false },
  )
  hotspotType: HotspotType;

  @Field(() => String)
  @Column('uuid')
  hotspoTypeId: string;

  // Space for hotspot Services
  @Field(() => [HotspotService])
  @OneToMany(
    () => HotspotService,
    type => type.hotspot,
    { eager: true, nullable: true },
  )
  hotspotServices: HotspotService[];

  /* Space for deleted hotspot */
  @Field(() => Boolean)
  @Column({ default: false })
  hotspot_deleted: boolean;
}
