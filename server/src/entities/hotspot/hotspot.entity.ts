import { ObjectType, Field } from '@nestjs/graphql';
import {
  EntityBaseWithDate,
  EntityBase,
} from 'src/entities/base-entity/base.entity';
import { EmptyClass } from 'src/shared/library';
import {
  Entity,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
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

  /* Space for Types and the relation*/

  @Field(() => [HotspotType])
  @ManyToMany(
    () => HotspotType,
    type => type.hotSpots,
    { eager: false },
  )
  @JoinTable({
    name: 'hotspots_hotsposts_types',
    joinColumn: {
      name: 'hotspotId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'hotspot_typeId',
      referencedColumnName: 'id',
    },
  })
  types: HotspotType[];

  /* Space for Services and the relation*/

  @Field(() => [HotspotService])
  @ManyToMany(
    () => HotspotService,
    service => service.hotSpots,
    { eager: false },
  )
  @JoinTable({
    name: 'hotspots_hotsposts_services',
    joinColumn: {
      name: 'hotspotId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'hotspot_serviceId',
      referencedColumnName: 'id',
    },
  })
  services: HotspotService[];

  /* Space for deleted hotspot */
  @Field(() => Boolean)
  @Column({ default: false })
  hotspot_deleted: boolean;
}
