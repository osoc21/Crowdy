import { ObjectType, Field } from '@nestjs/graphql';
import {
  EntityBaseWithDate,
  EntityBase,
} from 'src/entities/base-entity/base.entity';
import { EmptyClass } from 'src/shared/library';
import { Entity, Column, OneToMany } from 'typeorm';

@ObjectType()
@Entity('hotspotType')
export class HotspotType extends EntityBaseWithDate(EntityBase(EmptyClass)) {
  /* Space for hotspot type name */
  @Field(() => String)
  @Column('varchar', { length: 55, unique: true })
  type_name: string;

  /* Space for deleted hotspot type*/
  @Field(() => Boolean)
  @Column({ default: false })
  type_deleted: boolean;
}
