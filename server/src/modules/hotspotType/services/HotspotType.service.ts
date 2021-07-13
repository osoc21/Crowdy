import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HotspotType } from 'src/entities/hotspotType/hotspotType.entity';
// import { Role } from 'src/entities/role/role.entity';
import { CreateHotpotTypeDTO } from '../dtos/inputs/create-hotspotType.dto';
import { DeleteHotspotTypeDTO } from '../dtos/inputs/delete-hotspotType.dto';
import { UpdateHotspotTypeDTO } from '../dtos/inputs/update-hotspotType.dto';
import { AllHotspotTypeQueryResponse } from '../dtos/responses/queries/allhotspotType.response';
import { HotSpotTypeRepository } from '../repository/hotspotType.repository';

@Injectable()
export class HotSpotTypeService {
  constructor(
    @InjectRepository(HotSpotTypeRepository)
    private readonly hotspotTypeRepository: HotSpotTypeRepository,
  ) {}

  /* Get all HotspotType */
  async getAllHotspotType(
    page: number,
    perPage: number,
    q?: string,
    deleted?: boolean,
  ): Promise<AllHotspotTypeQueryResponse> {
    let HotspotTypeQB = await this.hotspotTypeRepository
      .createQueryBuilder('e')
      .leftJoinAndSelect('e.employees', 'employee');
    let countResults = await HotspotTypeQB.getCount();

    if (deleted == true) {
      HotspotTypeQB = HotspotTypeQB.andWhere('e.role_deleted = true', {
        deleted,
      });
      countResults = await HotspotTypeQB.getCount();
    } else if (deleted == false) {
      HotspotTypeQB = HotspotTypeQB.andWhere('e.role_deleted = false', {
        deleted,
      });
      countResults = await HotspotTypeQB.getCount();
    }

    if (q) {
      HotspotTypeQB = HotspotTypeQB.andWhere('e.role_name ilike :role_name', {
        role_name: `%${q}%`,
      });
      countResults = await HotspotTypeQB.getCount();
    }
    const skipValue: number = perPage * (page - 1);
    const roles = await HotspotTypeQB.take(perPage)
      .skip(skipValue)
      .getMany();
    return {
      types: roles,
      totalCount: countResults,
    };
  }

  // ** Get all active HotspotType
  async AllActiveHotspotType(): Promise<HotspotType[]> {
    return await this.hotspotTypeRepository.find({
      where: {
        type_deleted: 'false',
      },
      relations: ['hotspots'],
    });
  }

  // ** Get Selected HotspotType
  async getSelectedHotspotType(id: string) {
    return await this.hotspotTypeRepository.findOne(id);
  }

  /* HotspotType creation service */
  async createHotspotType(
    createHotspotTypeDTO: CreateHotpotTypeDTO,
  ): Promise<HotspotType> {
    return await this.hotspotTypeRepository.createHotspotType(
      createHotspotTypeDTO,
    );
  }

  /* HotspotType Update service */
  async updateHotspotType(updateHotspotTypeDTO: UpdateHotspotTypeDTO) {
    return await this.hotspotTypeRepository.updateHotspotType(
      updateHotspotTypeDTO,
    );
  }

  /* HotspotType Archive service */
  async archiveHotspotType(deleteHotspotTypeDTO: DeleteHotspotTypeDTO) {
    return await this.hotspotTypeRepository.archiveHotspotType(
      deleteHotspotTypeDTO,
    );
  }

  /* HotspotType Restore service */
  async restoreHotspotType(deleteHotspotTypeDTO: DeleteHotspotTypeDTO) {
    return await this.hotspotTypeRepository.restoreHotspotType(
      deleteHotspotTypeDTO,
    );
  }

  /* Role delete service */
  async deleteHotspotType(deleteHotspotTypeDTO: DeleteHotspotTypeDTO) {
    return await this.hotspotTypeRepository.deleteHotspotType(
      deleteHotspotTypeDTO,
    );
  }
}
