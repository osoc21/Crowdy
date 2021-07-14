import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HotSpot } from 'src/entities/hotspot/hotspot.entity';
import { HotspotType } from 'src/entities/hotspotType/hotspotType.entity';
import { CreateHotSpotDTO } from '../dtos/inputs/create-hotspot.dto';
import { DeleteHotspotDTO } from '../dtos/inputs/delete-hotspot.dto';
import { UpdateHotspotDTO } from '../dtos/inputs/update-hotspot.dto';
import { AllHotspotQueryResponse } from '../dtos/responses/queries/allhotspot.response';
import { HotSpotRepository } from '../repository/hotspot.repository';

@Injectable()
export class HotSpotService {
  constructor(
    @InjectRepository(HotSpotRepository)
    private readonly hotspotRepository: HotSpotRepository,
  ) {}

  /* Get all Hotspot */
  async getAllHotspot(
    page: number,
    perPage: number,
    q?: string,
    deleted?: boolean,
  ): Promise<AllHotspotQueryResponse> {
    let HotspotTypeQB = await this.hotspotRepository
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
      hotspots: roles,
      totalCount: countResults,
    };
  }

  // ** Get all active Hotspot
  async AllActiveHotspot(): Promise<HotSpot[]> {
    return await this.hotspotRepository.find({
      where: {
        type_deleted: 'false',
      },
      relations: ['hotspots'],
    });
  }

  // ** Get Selected Hotspot
  async getSelectedHotspot(id: string) {
    return await this.hotspotRepository.findOne(id);
  }

  /* Hotspot creation service */
  async createHotspot(createHotspotDTO: CreateHotSpotDTO): Promise<HotSpot> {
    return await this.hotspotRepository.createHotspot(createHotspotDTO);
  }

  /* Hotspot Update service */
  async updateHotspot(updateHotspotDTO: UpdateHotspotDTO) {
    return await this.hotspotRepository.updateHotspot(updateHotspotDTO);
  }

  /* Hotspot Archive service */
  async archiveHotspot(archiveHotspotDTO: DeleteHotspotDTO) {
    return await this.hotspotRepository.archiveHotspot(archiveHotspotDTO);
  }

  /* Hotspot Restore service */
  async restoreHotspot(restoreHotspotDTO: DeleteHotspotDTO) {
    return await this.hotspotRepository.restoreHotspot(restoreHotspotDTO);
  }

  /* Hotspot delete service */
  async deleteHotspot(deleteHotspotDTO: DeleteHotspotDTO) {
    return await this.hotspotRepository.deleteHotspot(deleteHotspotDTO);
  }
}
