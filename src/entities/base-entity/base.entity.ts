import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Constructor } from '../../shared/library/shared.constructor';

/**
 * This abstract class includes ID as a Primary Key
 * @param Base Class which plans to extends from AbstractBase
 */
export function EntityBase<TBase extends Constructor>(Base: TBase) {
  @ObjectType()
  abstract class AbstractBase extends Base {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    readonly id: string;
  }

  return AbstractBase;
}

/**
 * This abstract function includes CreatedAt && UpdatedAt timestamps can attach another class as parameter
 * @param Base Class which plans to extends from AbstractBase
 */
export function EntityBaseWithDate<TBase extends Constructor>(Base: TBase) {
  @ObjectType()
  abstract class AbstractBase extends Base {
    @Field(() => String)
    @CreateDateColumn({
      name: 'created_at',
      type: 'timestamp',
      nullable: true,
      default: () => 'CURRENT_TIMESTAMP(6)',
    })
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn({
      name: 'updated_at',
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP(6)',
      onUpdate: 'CURRENT_TIMESTAMP(6)',
    })
    updatedAt: Date;
  }

  return AbstractBase;
}
