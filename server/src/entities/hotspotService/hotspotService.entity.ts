import { ObjectType, Field } from '@nestjs/graphql';
import {
  EntityBaseWithDate,
  EntityBase,
} from 'src/entities/base-entity/base.entity';
import { EmptyClass } from 'src/shared/library';
import { Entity, Column, OneToMany } from 'typeorm';

@ObjectType()
@Entity('hotspotServices')
export class HotspotService extends EntityBaseWithDate(EntityBase(EmptyClass)) {
  /* Space for service name */
  @Field(() => String)
  @Column('varchar', { length: 55, unique: true })
  service_name: string;

  /* Space for deleted service*/
  @Field(() => Boolean)
  @Column({ default: false })
  service_deleted: boolean;
}
