import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateHotSpotServiceDTO } from '../dtos/inputs/create-hotspotService.dto';
import { DeleteHotspotServiceDTO } from '../dtos/inputs/delete-hotspotService.dto';
import { HotspotServiceUpdateDTO } from '../dtos/inputs/update-hotspotService.dto';
import { HotspotService } from './../../../entities/hotspotService/hotspotService.entity';

@Injectable()
@EntityRepository(HotspotService)
export class HotspotServiceRepository extends Repository<HotspotService> {
  /* Hotspot Services creation repository */
  async createHotspotService(
    createHotspotDTO: CreateHotSpotServiceDTO,
  ): Promise<HotspotService> {
    const { service_name } = createHotspotDTO;

    const service = this.create();
    service.service_name = service_name;

    try {
      await this.manager.save(service);
      return service;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException(
          `The hotspot Service name already exist. Try again later.`,
        );
      } else {
        throw new InternalServerErrorException(
          `Error while saving the data in database.`,
        );
      }
    }
  }

  /* HotSpot Update repository */
  async updateHotspotService(
    updateHotspotServiceDTO: HotspotServiceUpdateDTO,
  ): Promise<HotspotService> {
    const { service_name, service_id } = updateHotspotServiceDTO;
    const service = await this.findHotspotById(service_id);
    service.service_name = service_name ? service_name : service.service_name;

    try {
      await this.save(service);
      return service;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error while updating the hotspot Service name!`,
      );
    }
  }

  /* HotSpot archive repository */
  async archiveHotspotService(
    archiveHotspotServiceDTO: DeleteHotspotServiceDTO,
  ) {
    const { service_id: hotspot_id } = archiveHotspotServiceDTO;
    const service = await this.findHotspotById(hotspot_id);
    service.service_deleted = true;

    try {
      await this.save(service);
      return service;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error while archiving the hotspot Service. Please try again later!`,
      );
    }
  }

  /* HotSpot restore repository */
  async restoreHotspotService(
    restoreHotspotServiceDTO: DeleteHotspotServiceDTO,
  ) {
    const { service_id: hotspot_id } = restoreHotspotServiceDTO;
    const service = await this.findHotspotById(hotspot_id);
    service.service_deleted = false;

    try {
      await this.save(service);
      return service;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error while restoring the hotspot Service. Please try again later!`,
      );
    }
  }

  /* HotSpot delete repository */
  async deleteHotspotService(deleteHotSpotServiceDTO: DeleteHotspotServiceDTO) {
    const { service_id: hotspot_id } = deleteHotSpotServiceDTO;
    const service = await this.findHotspotById(hotspot_id);
    const result = await this.delete(service.id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `We encoutered a problem while retrieving the data you requested. 
                 Either it is invalid input or we have no record of the requested data in our database.`,
      );
    }
  }

  /* HotSpot by id */

  async findHotspotById(serviceId: string): Promise<HotspotService> {
    const service = await this.findOne(serviceId);

    if (!service)
      throw new NotFoundException(
        `We encoutered a problem while retrieving the data you requested. 
                 Either it is invalid input or we have no record of the requested data in our database.`,
      );
    return service;
  }
}
