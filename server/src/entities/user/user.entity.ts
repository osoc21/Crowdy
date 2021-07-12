import { ObjectType, Field } from '@nestjs/graphql';
import { EntityWithNames } from 'src/entities/base-entity/base-user/name.abstract';
import {
  EntityBaseWithDate,
  EntityBase,
} from 'src/entities/base-entity/base.entity';
import { EmptyClass } from 'src/shared/library';
import {
  Entity,
  Column,
  BeforeInsert,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { v4 } from 'uuid';

import * as bcrypt from 'bcryptjs';

@ObjectType()
@Entity('users')
export class User extends EntityBaseWithDate(
  EntityWithNames(EntityBase(EmptyClass)),
) {
  /* Space for username */
  @Field(() => String)
  @Column('varchar', { length: 55, unique: true })
  username: string;

  /* Space for email */
  @Field(() => String)
  @Column('varchar', { length: 100, unique: true })
  email: string;

  /* Space for confirmationToken */
  @Column({ nullable: true, type: 'varchar', length: 512 })
  confirmationToken: string;

  /* Space for recoverToken */
  @Column({ nullable: true, type: 'varchar', length: 512 })
  recoverToken: string;

  /* Space for password:: has to remain private */
  @Column('varchar', { length: 255 })
  private _password: string;
  public get password(): string {
    return this._password;
  }
  public set password(value: string) {
    this._password = value;
  }

  /* Space for salt */
  @Column('varchar', { length: 255 })
  salt: string;

  /* Space for User# : sort of customer number */
  @Field(() => String)
  @Column('varchar', { length: 55, unique: true })
  user_ID: string;

  /* Space for user role */
  @Field(() => String)
  @Column('varchar', { length: 55 })
  role: string;

  /* Space for user status */
  @Field(() => String)
  @Column('varchar', { length: 55 })
  status: string;

  /* Space for user picture */
  @Field({ nullable: true })
  @Column('varchar', { length: 255, nullable: true })
  avatar?: string;

  /* Space for revoke Login */
  @Field(() => Boolean)
  @Column({ default: false })
  revoke_login: boolean;

  /* Space for user archivation */
  @Field(() => Boolean)
  @Column({ default: false })
  archived: boolean;

  /* Space for token version */
  @Field(() => String)
  @Column('int', { default: 0 })
  tokenVersion: number;

  /******************************************************************************
   *                                                                             *
   *******************************************************************************/

  /* Auto generating Username */
  @BeforeInsert()
  public setUsername() {
    this.username = v4();
  }

  /**
   * Auto generating username
   */
  @BeforeInsert()
  public autoGenerateUsername() {
    let result = '';
    const characters =
      'ABCD1EF4GuxydH2IJ5KLM6NOP3QR8STUVWXYZab8cdefgh9ijklmnopq7rstuvwXCFTNNJISxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 12; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.username = result;
  }

  /**
   * Auto generating User_number
   */
  @BeforeInsert()
  public autoGenerateUserNumber() {
    let result = '';
    const characters = '0123456789';
    const prefix = 'ZX-USR-';
    const slicedFirstN = this.firstname.slice(0, 2).toUpperCase();
    const slicedlastN = this.lastname.slice(-2).toUpperCase();
    const sliced = slicedFirstN + slicedlastN;
    const charactersLength = characters.length;
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    this.user_ID = `${prefix}${sliced}-${result}`;
  }

  /* --------------------------------------------------------------------------------*/
  /* * Custom methods                                                                  *
   *----------------------------------------------------------------------------------*/

  /* Password Validation */
  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }

  /* Password encryption */
  async encryptPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
