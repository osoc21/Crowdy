import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateHotSpotServiceDTO } from '../dtos/inputs/create-hotspotService.dto';
import { DeleteHotspotServiceDTO } from '../dtos/inputs/delete-hotspotService.dto';
import { HotspotServiceUpdateDTO } from '../dtos/inputs/update-hotspotService.dto';
import { AllHotspotServiceQueryResponse } from '../dtos/responses/queries/allhotspotService.response';
import { HotspotServiceRepository } from '../repository/hotspotService.repository';
import { HotspotService } from './../../../entities/hotspotService/hotspotService.entity';

@Injectable()
export class HotSpotService {
  constructor(
    @InjectRepository(HotspotServiceRepository)
    private readonly hotspotServiceRepository: HotspotServiceRepository,
  ) {}

  /* Get all Hotspot */
  async getAllHotspotServices(
    page: number,
    perPage: number,
    q?: string,
    deleted?: boolean,
  ): Promise<AllHotspotServiceQueryResponse> {
    let HotspotTypeQB = await this.hotspotServiceRepository
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

  // ** Get all active Hotspot Service
  async AllActiveHotspotService(): Promise<HotspotService[]> {
    return await this.hotspotServiceRepository.find({
      where: {
        service_deleted: 'false',
      },
      relations: ['hotSpots'],
    });
  }

  // ** Get Selected Hotspot Service
  async getSelectedHotspotService(id: string) {
    return await this.hotspotServiceRepository.findOne(id);
  }

  /* Hotspot creation Hotspot service */
  async createHotspotService(
    createHotspotTypeDTO: CreateHotSpotServiceDTO,
  ): Promise<HotspotService> {
    return await this.hotspotServiceRepository.createHotspotService(
      createHotspotTypeDTO,
    );
  }

  /* Hotspot Update service */
  async updateHotspotService(updateHotspotDTO: HotspotServiceUpdateDTO) {
    return await this.hotspotServiceRepository.updateHotspotService(
      updateHotspotDTO,
    );
  }

  /* Hotspot Archive service */
  async archiveHotspotService(archiveHotspotDTO: DeleteHotspotServiceDTO) {
    return await this.hotspotServiceRepository.archiveHotspotService(
      archiveHotspotDTO,
    );
  }

  /* Hotspot Restore service */
  async restoreHotspotService(restoreHotspotDTO: DeleteHotspotServiceDTO) {
    return await this.hotspotServiceRepository.restoreHotspotService(
      restoreHotspotDTO,
    );
  }

  /* Hotspot delete service */
  async deleteHotspotService(deleteHotspotDTO: DeleteHotspotServiceDTO) {
    return await this.hotspotServiceRepository.deleteHotspotService(
      deleteHotspotDTO,
    );
  }
}
