import { ObjectType, Field } from '@nestjs/graphql';
import { EntityWithNames } from 'src/entities/base-entity/base-user/name.abstract';
import {
  EntityBaseWithDate,
  EntityBase,
} from 'src/entities/base-entity/base.entity';
import { EmptyClass } from 'src/shared/library';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  Any,
} from 'typeorm';
import { v4 } from 'uuid';
import GraphQLJSON from 'graphql-type-json';
import * as bcrypt from 'bcryptjs';
import { AdminStatus } from './enum/admin.status.enum';

@ObjectType()
@Entity('admins')
export class Admin extends EntityBaseWithDate(
  EntityWithNames(EntityBase(EmptyClass)),
) {
  /* Space for avatar */
  @Field({ nullable: true })
  @Column('text', { nullable: true })
  avatar: string;

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
  user_number: string;

  /* Space for role */
  @Field(() => String)
  @Column('varchar', { length: 255 })
  role: string;

  /* Space for Email_verified# */
  @Field(() => Boolean)
  @Column({ default: false })
  email_verified: boolean;

  /* Space for user status */
  @Field(() => String)
  @Column({ type: 'enum', enum: AdminStatus, default: AdminStatus.OFFLINE })
  status: AdminStatus;

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
    this.user_number = `${prefix}${sliced}-${result}`;
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
