import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Admin } from '../../../entities/admin/admin.entity';

@Injectable()
@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {
  async findById(id: string) {
    return await this.createQueryBuilder('users')
      .where('users.id = :id', { id })
      .getOne();
  }

  async findByEmail(email: string) {
    return this.createQueryBuilder('user')
      .where('user.email = :email', {
        email,
      })
      .getOne();
  }
}
