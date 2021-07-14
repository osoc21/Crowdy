import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { HotSpot } from 'src/entities/hotspot/hotspot.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateHotSpotDTO } from '../dtos/inputs/create-hotspot.dto';
import { DeleteHotspotDTO } from '../dtos/inputs/delete-hotspot.dto';
import { UpdateHotspotDTO } from '../dtos/inputs/update-hotspot.dto';

@Injectable()
@EntityRepository(HotSpot)
export class HotSpotRepository extends Repository<HotSpot> {
  /* HotSpot creation repository */
  async createHotspot(createHotspotDTO: CreateHotSpotDTO): Promise<HotSpot> {
    const {
      hotspot_name,
      city,
      district,
      coordinates,
      street,
      number,
    } = createHotspotDTO;

    const hotspot = this.create();
    hotspot.hotspot_name = hotspot_name;
    hotspot.coordinates = coordinates;
    hotspot.city = city;
    hotspot.district = district;
    hotspot.street = street;
    hotspot.number = number;

    try {
      await this.manager.save(hotspot);
      return hotspot;
    } catch (error) {
      if (error.code.toString() === '23505') {
        throw new ConflictException(
          `The hotspot type name already exist. Try again later.`,
        );
      } else {
        throw new InternalServerErrorException(
          `Error while saving the data in database.`,
        );
      }
    }
  }

  /* HotSpot Update repository */
  async updateHotspot(
    updateHotspotTypeDTO: UpdateHotspotDTO,
  ): Promise<HotSpot> {
    const {
      hotspot_name,
      hotspot_id,
      hotspot_coordinates,
    } = updateHotspotTypeDTO;
    const type = await this.findHotspotById(hotspot_id);
    type.hotspot_name = hotspot_name ? hotspot_name : type.hotspot_name;

    try {
      await this.save(type);
      return type;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error while updating the hotspot  name!`,
      );
    }
  }

  /* HotSpot archive repository */
  async archiveHotspot(archiveHotspotTypeDTO: DeleteHotspotDTO) {
    const { hotspot_id: type_id } = archiveHotspotTypeDTO;
    const type = await this.findHotspotById(type_id);
    type.hotspot_deleted = true;

    try {
      await this.save(type);
      return type;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error while archiving the hotspot . Please try again later!`,
      );
    }
  }

  /* HotSpot restore repository */
  async restoreHotspot(restoreHotspoTypeDTO: DeleteHotspotDTO) {
    const { hotspot_id } = restoreHotspoTypeDTO;
    const type = await this.findHotspotById(hotspot_id);
    type.hotspot_deleted = false;

    try {
      await this.save(type);
      return type;
    } catch (error) {
      throw new InternalServerErrorException(
        `Error while restoring the hotspot type. Please try again later!`,
      );
    }
  }

  /* HotSpot delete repository */
  async deleteHotspot(deleteHotSpotTypeDTO: DeleteHotspotDTO) {
    const { hotspot_id: type_id } = deleteHotSpotTypeDTO;
    const type = await this.findHotspotById(type_id);
    const result = await this.delete(type.id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `We encoutered a problem while retrieving the data you requested. 
                 Either it is invalid input or we have no record of the requested data in our database.`,
      );
    }
  }

  /* HotSpot by id */

  async findHotspotById(typeId: string): Promise<HotSpot> {
    const type = await this.findOne(typeId);

    if (!type)
      throw new NotFoundException(
        `We encoutered a problem while retrieving the data you requested. 
                 Either it is invalid input or we have no record of the requested data in our database.`,
      );
    return type;
  }
}
